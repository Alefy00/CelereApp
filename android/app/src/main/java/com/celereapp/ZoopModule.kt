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
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.launch
import java.util.UUID

class ZoopModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val tapOnPhone = TapOnPhone(reactContext)
    private val coroutineScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)

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
            val theme = TapOnPhoneTheme(
                logo = reactApplicationContext.resources.getDrawable(R.drawable.splash_screen, null),
                backgroundColor = Color.parseColor("#FADC00"),
                amountTextColor = Color.parseColor("#000000"),
                paymentTypeTextColor = Color.parseColor("#000000"),
                statusTextColor = Color.parseColor("#4CAF50"),
                cardAnimation = R.raw.card_animation,
                brandBackgroundColor = "#1434CB",
                pinPadType = PinPadType.SHUFFLED
            )

            val credentials = InitializationRequest.Credentials(
                clientId = clientId,
                clientSecret = clientSecret,
                marketplace = marketplace,
                seller = seller,
                accessKey = accessKey
            )

            val request = InitializationRequest(
                theme = theme,
                credentials = credentials
            )

            tapOnPhone.initialize(
                request = request,
                onSuccess = {
                    promise.resolve("SDK initialized successfully")
                },
                onError = { error ->
                    promise.reject("SDK_INITIALIZATION_ERROR", error.message)
                }
            )
        } catch (e: Exception) {
            promise.reject("SDK_INITIALIZATION_ERROR", e.message)
        }
    }

    @ReactMethod
    fun pay(amount: Double, paymentType: String, installments: Int?, promise: Promise) {
        coroutineScope.launch {
            try {
                val paymentRequest = PaymentRequest(
                    referenceId = UUID.randomUUID().toString(),
                    amount = (amount * 100).toLong(),
                    paymentType = when (paymentType) {
                        "credit" -> PaymentType.CREDIT
                        "debit" -> PaymentType.DEBIT
                        else -> PaymentType.CREDIT
                    },
                    installments = if (installments != null && installments >= 2) installments else null,
                    metadata = """
                        {
                            "client": "CelerePay",
                            "info": "Payment from Zoop"
                        }
                    """.trimIndent()
                )

                tapOnPhone.pay(
                    payRequest = paymentRequest,
                    onApproved = { response ->
                        promise.resolve(
                            "Pagamento aprovado! Id da transação: ${response.transactionId}, Bandeira: ${response.cardBrand}"
                        )
                    },
                    onError = { error ->
                        promise.reject(
                            "PAYMENT_ERROR",
                            """
                                Erro ao realizar pagamento:
                                Id da Transação: ${error.transactionId ?: "N/A"}
                                Mensagem: ${error.message}
                                Código: ${error.code}
                                Descrição: ${error.description}
                            """.trimIndent()
                        )
                    }
                )
            } catch (e: Exception) {
                promise.reject("PAYMENT_ERROR", e.message)
            }
        }
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        coroutineScope.coroutineContext.cancel()
    }
}
