package com.celereapp

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.zoop.sdk.plugin.taponphone.api.InitializationRequest
import com.zoop.sdk.plugin.taponphone.api.TapOnPhone
import com.zoop.sdk.plugin.taponphone.api.TapOnPhoneError

class ZoopModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val tapOnPhone = TapOnPhone(reactContext)

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
        // Logs para depuração
        Log.d("ZoopModule", "Mock Initialization called")
        Log.d("ZoopModule", "Received clientId: $clientId")
        Log.d("ZoopModule", "Received clientSecret: $clientSecret")
        Log.d("ZoopModule", "Received marketplace: $marketplace")
        Log.d("ZoopModule", "Received seller: $seller")
        Log.d("ZoopModule", "Received accessKey: $accessKey")

        // Simula uma inicialização bem-sucedida
        promise.resolve("SDK initialized successfully (mock)")
    } catch (e: Exception) {
        Log.e("ZoopModule", "Error initializing SDK (mock)", e)
        promise.reject("SDK_INITIALIZATION_ERROR", e.message)
    }
}
}