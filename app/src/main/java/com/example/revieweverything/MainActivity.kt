package com.example.revieweverything

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.colorResource
import androidx.compose.ui.tooling.preview.Preview
import com.example.revieweverything.ui.theme.BackgroundWhiteTheme
import com.example.revieweverything.ui.theme.ReviewEverythingTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            ReviewEverythingTheme {
                // A surface container using the 'background' color from the theme
//                Surface(
//                    modifier = Modifier.fillMaxSize(),
//                    color = MaterialTheme.colors.background
//                ) {
//                    Greeting("Android")
//                }
                LoginSignupBackground {

                }
            }
        }
    }
}

@Composable
fun LoginSignupBackground(
    content: @Composable () -> Unit
) {
    Surface(
        modifier = Modifier
            .fillMaxSize(),
        color = BackgroundWhiteTheme,
        content = content
    )
}

@Preview(showBackground = true)
@Composable
fun LoginSignupBackgroundPreview(
) {
    LoginSignupBackground {}
}

//
//@Composable
//fun Greeting(name: String) {
//    Text(text = "Hello $name!")
//}
//
//@Preview(showBackground = true)
//@Composable
//fun DefaultPreview() {
//    ReviewEverythingTheme {
//        Greeting("Android")
//    }
//}