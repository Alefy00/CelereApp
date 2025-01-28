package com.celereapp

import android.graphics.Color
import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.zoop.sdk.plugin.taponphone.api.InitializationRequest
import com.zoop.sdk.plugin.taponphone.api.PaymentRequest
import com.zoop.sdk.plugin.taponphone.api.PaymentType
import com.zoop.sdk.plugin.taponphone.api.TapOnPhone
import com.zoop.sdk.plugin.taponphone.api.TapOnPhoneTheme
import com.zoop.sdk.plugin.taponphone.api.PinPadType
import com.zoop.sdk.plugin.taponphone.api.PaymentApprovedResponse
import com.zoop.sdk.plugin.taponphone.api.PaymentErrorResponse
import com.zoop.sdk.plugin.taponphone.api.TapOnPhoneError

import androidx.core.content.ContextCompat
import android.content.Context
import android.nfc.NfcManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import java.util.UUID

// Enum para representar o estado do pagamento
enum class PaymentStatus {
    PROCESSING,
    SUCCESS,
    FAIL
}

class ZoopModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val tapOnPhone = TapOnPhone(reactContext) // Instância principal do SDK Tap to Phone
    private val coroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)  // Gerenciador de corrotinas
    private var paymentStatus: PaymentStatus = PaymentStatus.FAIL // Estado inicial do pagamento

    // Exibe uma mensagem de alerta
    private fun sendAlert(title: String, message: String) {
    val reactInstanceManager = reactApplicationContext.currentActivity
    reactInstanceManager?.runOnUiThread {
        android.app.AlertDialog.Builder(reactInstanceManager)
            .setTitle(title)
            .setMessage(message)
            .setPositiveButton("OK", null)
            .show()
    }
}
 // Verifica se o NFC está habilitado no dispositivo
private fun isNfcEnabled(): Boolean {
    val nfcManager = reactApplicationContext.getSystemService(Context.NFC_SERVICE) as NfcManager
    val adapter = nfcManager.defaultAdapter
    val nfcEnabled = adapter != null && adapter.isEnabled

    return nfcEnabled
}

    // Armazenando as credenciais para reutilização
    private lateinit var savedCredentials: InitializationRequest.Credentials

    override fun getName(): String {
        return "ZoopModule"
    }

    // Inicializa o SDK Tap to Phone
    @ReactMethod
    fun initializeSDK(
        clientId: String,
        clientSecret: String,
        marketplace: String,
        seller: String,
        accessKey: String,
        promise: Promise
    ) {

// Verifica se o NFC está habilitado
if (!isNfcEnabled()) {
    sendAlert("Erro", "O NFC não está habilitado no dispositivo. Por favor, ative o NFC para continuar.")
    promise.reject("NFC_ERROR", "O NFC não está habilitado no dispositivo.")
    return
}

        try {
            // Configuração do tema do SDK
            val theme = TapOnPhoneTheme(
                logo = ContextCompat.getDrawable(reactApplicationContext, R.drawable.splash_screen),
                backgroundColor = Color.parseColor("#FADC00"),
                amountTextColor = Color.parseColor("#000000"),
                paymentTypeTextColor = Color.parseColor("#000000"),
                statusTextColor = Color.parseColor("#4CAF50"),
                cardAnimation = R.raw.card_animation,
                brandBackgroundColor = "#1434CB",
                pinPadType = PinPadType.SHUFFLED
            )
            // Salva as credenciais iniciais
            savedCredentials = InitializationRequest.Credentials(
                clientId = clientId,
                clientSecret = clientSecret,
                marketplace = marketplace,
                seller = seller,
                accessKey = accessKey
            )
            // Cria a requisição de inicialização
            val request = InitializationRequest(
                theme = theme,
                credentials = savedCredentials
            )
            // Inicializa o SDK
            tapOnPhone.initialize(
                request = request,
                onSuccess = {
                    promise.resolve("SDK initialized successfully")
                },
                onError = { error: TapOnPhoneError ->
                        sendAlert(
                            "Erro na Inicialização",
                            """
                            Código: ${error.code}
                            Mensagem: ${error.message}
                            """.trimIndent()
                        )
                        promise.reject("SDK_INITIALIZATION_ERROR", "Erro: ${error.message}, Código: ${error.code}")
                    }
            )
        } catch (e: Exception) {
            sendAlert("Erro", "Exceção na inicialização: ${e.message}")
            promise.reject("SDK_INITIALIZATION_ERROR", e.message)
        }
    }

 // Realiza um pagamento com o SDK
@ReactMethod
fun pay(
    amount: Double,
    paymentType: String,
    installments: Int?,
    userSellerId: String,  
    promise: Promise
) {
    val amountInCents = (amount * 100).toLong() // Converte reais para centavos

    sendAlert(
        "Pagamento Iniciado",
        """
        Iniciando pagamento com:
        Amount (em centavos): $amountInCents
        PaymentType: $paymentType
        Installments: $installments
        SellerId (usuário): $userSellerId
        """.trimIndent()
    )
    // Verifica se já há um pagamento em andamento
    if (paymentStatus == PaymentStatus.PROCESSING) {
        promise.reject("PAYMENT_ERROR", "Um pagamento já está em andamento.")
        return
    }

    paymentStatus = PaymentStatus.PROCESSING

    try {
        // Atualiza dinamicamente as credenciais com o sellerId do usuário
        val updatedCredentials = InitializationRequest.Credentials(
            clientId = savedCredentials.clientId,
            clientSecret = savedCredentials.clientSecret,
            marketplace = savedCredentials.marketplace,
            seller = userSellerId, // Atualiza o sellerId
            accessKey = savedCredentials.accessKey
        )

        tapOnPhone.setCredential(updatedCredentials) // Altera as credenciais dinamicamente

        sendAlert("ZoopSDK", "Credenciais originais: ${savedCredentials.seller}")
        sendAlert("ZoopSDK", "Novas credenciais: ${updatedCredentials.seller}")

        coroutineScope.launch {
            try {
                // Cria a requisição de pagamento
                val paymentRequest = PaymentRequest(
                    referenceId = UUID.randomUUID().toString(),
                    amount = amountInCents,
                    paymentType = when (paymentType) {
                        "credit" -> PaymentType.CREDIT
                        "debit" -> PaymentType.DEBIT
                        else -> PaymentType.CREDIT // Fallback
                    },
                    installments = installments ?: 1
                )

                // Realiza o pagamento
                tapOnPhone.pay(
                    payRequest = paymentRequest,
                    onApproved = { response ->
                        paymentStatus = PaymentStatus.SUCCESS
                        sendAlert(
                            "Pagamento Aprovado",
                            """
                                Transação Aprovada:
                                ID: ${response.transactionId}
                                Bandeira: ${response.cardBrand}
                            """.trimIndent()
                        )
                        promise.resolve(
                            "Pagamento aprovado! Transação: ${response.transactionId}, Bandeira: ${response.cardBrand}"
                        )
                    },
                    onError = { error ->
                        paymentStatus = PaymentStatus.FAIL
                        sendAlert(
                            "Erro no Pagamento",
                            """
                                Código: ${error.code}
                                Mensagem: ${error.message}
                                Descrição: ${error.description}
                                ID Transação: ${error.transactionId ?: "N/A"}
                            """.trimIndent()
                        )
                        promise.reject(
                            "PAYMENT_ERROR",
                            """
                                Erro: ${error.message}
                                Código: ${error.code}
                                Descrição: ${error.description}
                            """.trimIndent()
                        )
                    }
                )
            } catch (e: Exception) {
                paymentStatus = PaymentStatus.FAIL
                sendAlert("Erro", "Exceção no pagamento: ${e.message}")
                promise.reject("PAYMENT_ERROR", e.message)
            }
        }
    } catch (e: Exception) {
        paymentStatus = PaymentStatus.FAIL
        sendAlert("Erro", "Falha ao atualizar credenciais: ${e.message}")
        promise.reject("SET_CREDENTIAL_ERROR", e.message)
    }
}
// Cancela todas as corrotinas ao destruir o módulo
    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        coroutineScope.coroutineContext.cancel()
    }
}
