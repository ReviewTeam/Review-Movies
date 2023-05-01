package com.example.revieweverything

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.revieweverything.ui.theme.*

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
                StandardTextPreview()
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

@Composable
fun StandardTickbox() {
    var isCheckboxTicked by remember { mutableStateOf(false) }
    Checkbox(
        checked = isCheckboxTicked,
        onCheckedChange = { isCheckboxTicked = it },
        modifier = Modifier.padding(5.dp),
        colors = CheckboxDefaults.colors(Color.Blue)
    )
}

@Composable
fun StandardButton(
    content: @Composable () -> Unit
) {
    Button(
        colors = ButtonDefaults.buttonColors(
            backgroundColor = Purple500,
            contentColor = textBlackTheme
        ),
        onClick = {},
    ) {
        content()
    }
}

@Composable
fun LoginSignupFrame(
    content: @Composable () -> Unit
) {
    BoxWithConstraints(
        modifier = Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Column(
            modifier = Modifier
                .fillMaxHeight(0.85f)
                .fillMaxWidth(0.85f)
                .clip(RoundedCornerShape(16.dp))
                .background(PanelBlackTheme)
                .padding(20.dp)
        ) {
            content()
        }
    }
}

@Preview(showBackground = true)
@Composable
fun StandardTextPreview() {
    LoginSignupBackground {
        Column {
            StandardText(text = "Hello there")
            BoldStandardText(text = "Hello there")
            LoginText(text = "Hello there")
            TitleText(text = "Hello there")
            StandardTickbox()
            StandardButton { Text(text = "Login") }
            LoginSignupFrame {
                Text(text = "Panel")
            }
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