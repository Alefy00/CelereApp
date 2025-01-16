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
import androidx.core.content.ContextCompat
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import java.util.UUID

enum class PaymentStatus {
    PROCESSING,
    SUCCESS,
    FAIL
}

class ZoopModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val tapOnPhone = TapOnPhone(reactContext)
    private val coroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private var paymentStatus: PaymentStatus = PaymentStatus.FAIL

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

    // Armazenando as credenciais para reutilização
    private lateinit var savedCredentials: InitializationRequest.Credentials

    override fun getName(): String {
        return "ZoopModule"
    }

    @ReactMethod
    fun initializeSDK(
        clientId: String,
        clientSecret: String,
        marketplace: String,
        seller: String,
        accessKey: String,
        promise: Promise
    ) {
        try {
                   // Exibir credenciais como alerta
        val initMessage = """
            Inicializando SDK com:
            clientId: $clientId
            clientSecret: $clientSecret
            seller: $seller
            marketplace: $marketplace
            accessKey: $accessKey
        """.trimIndent()

        sendAlert("Inicialização do SDK", initMessage)



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

            savedCredentials = InitializationRequest.Credentials(
                clientId = clientId,
                clientSecret = clientSecret,
                marketplace = marketplace,
                seller = seller,
                accessKey = accessKey
            )

            val request = InitializationRequest(
                theme = theme,
                credentials = savedCredentials
            )

            tapOnPhone.initialize(
                request = request,
                onSuccess = {
                     sendAlert("Sucesso", "SDK inicializado com sucesso!")
                    promise.resolve("SDK initialized successfully")
                },
                onError = { error ->
                    sendAlert("Erro na Inicialização", "Código: ${error.code}\nMensagem: ${error.message}")
                    promise.reject("SDK_INITIALIZATION_ERROR", "Erro: ${error.message}, Código: ${error.code}")
                }
            )
        } catch (e: Exception) {
            sendAlert("Erro", "Exceção na inicialização: ${e.message}")
            promise.reject("SDK_INITIALIZATION_ERROR", e.message)
        }
    }

    @ReactMethod
    fun pay(amount: Double, paymentType: String, installments: Int?, sellerId: String, promise: Promise) {

        sendAlert(
        "Pagamento Iniciado",
        """
        Iniciando pagamento com:
        Amount: $amount
        PaymentType: $paymentType
        Installments: $installments
        SellerId: $sellerId
        """.trimIndent()
    )
        if (paymentStatus == PaymentStatus.PROCESSING) {
            
            promise.reject("PAYMENT_ERROR", "Um pagamento já está em andamento.")
            return
        }

        paymentStatus = PaymentStatus.PROCESSING

        coroutineScope.launch {
            try {
                // Atualizando apenas o sellerId nas credenciais salvas
                val updatedCredentials = savedCredentials.copy(seller = sellerId)
                tapOnPhone.setCredential(updatedCredentials)

                val paymentRequest = PaymentRequest(
                    referenceId = UUID.randomUUID().toString(),
                    amount = (amount * 100).toLong(),
                    paymentType = when (paymentType) {
                        "credit" -> PaymentType.CREDIT
                        "debit" -> PaymentType.DEBIT
                        else -> PaymentType.CREDIT
                    },
                    installments = if (installments != null && installments >= 2) installments else null
                )

                tapOnPhone.pay(
                    payRequest = paymentRequest,
                    onApproved = { response ->
                        paymentStatus = PaymentStatus.SUCCESS
                        sendAlert("Pagamento Aprovado", "Transação: ${response.transactionId}")
                        promise.resolve("Pagamento aprovado! Id da transação: ${response.transactionId}, Bandeira: ${response.cardBrand}")
                    },
                    onError = { error ->
                        paymentStatus = PaymentStatus.FAIL
                        sendAlert("Erro no Pagamento", "Código: ${error.code}\nMensagem: ${error.message}")
                        promise.reject("PAYMENT_ERROR", "Erro: ${error.message}")
                    }
                )
            } catch (e: Exception) {
                paymentStatus = PaymentStatus.FAIL
                sendAlert("Erro", "Exceção no pagamento: ${e.message}")
                promise.reject("PAYMENT_ERROR", e.message)
            }
        }
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        coroutineScope.coroutineContext.cancel()
    }
}
