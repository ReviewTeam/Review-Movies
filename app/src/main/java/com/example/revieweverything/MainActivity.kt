package com.example.revieweverything

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.Surface
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.revieweverything.ui.theme.BackgroundWhiteTheme
import com.example.revieweverything.ui.theme.ReviewEverythingTheme
import com.example.revieweverything.ui.theme.fonts
import com.example.revieweverything.ui.theme.textWhiteTheme

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

@Composable
fun StandardText(
    text: String
) {
    Text(
        modifier = Modifier
            .padding(5.dp),
        fontFamily = fonts,
        fontWeight = FontWeight.Normal,
        fontSize = 20.sp,
        color = textWhiteTheme,
        text = text
    )
}

@Composable
fun BoldStandardText(
    text: String
) {
    Text(
        modifier = Modifier
            .padding(5.dp),
        fontFamily = fonts,
        fontWeight = FontWeight.Bold,
        fontSize = 30.sp,
        color = textWhiteTheme,
        text = text
    )
}

@Composable
fun LoginText(
    text: String
) {
    Text(
        modifier = Modifier
            .padding(5.dp),
        fontFamily = fonts,
        fontWeight = FontWeight.Medium,
        fontSize = 25.sp,
        color = textWhiteTheme,
        text = text
    )
}

@Composable
fun TitleText(
    text: String
) {
    Text(
        modifier = Modifier
            .padding(5.dp),
        fontFamily = fonts,
        fontWeight = FontWeight.Black,
        fontSize = 35.sp,
        color = textWhiteTheme,
        text = text
    )
}

@Preview(showBackground = true)
@Composable
fun StandardText() {
    LoginSignupBackground {
        Column {
            StandardText(text = "Hello there")
            BoldStandardText(text = "Hello there")
            LoginText(text = "Hello there")
            TitleText(text = "Hello there")
        }
    }
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