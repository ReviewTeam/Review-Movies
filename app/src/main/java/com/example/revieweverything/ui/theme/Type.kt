package com.example.revieweverything.ui.theme

import androidx.compose.material.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.example.revieweverything.R

val fonts = FontFamily(
    Font(R.font.roboto_black, weight = FontWeight.Black),
    Font(R.font.roboto_black_italic, style = FontStyle.Italic),
    Font(R.font.roboto_bold, weight = FontWeight.Bold),
    Font(R.font.roboto_italic, weight = FontWeight.Normal, style = FontStyle.Italic),
    Font(R.font.roboto_light, weight = FontWeight.Light),
    Font(R.font.roboto_bold_italic, weight = FontWeight.Bold, style = FontStyle.Italic),
    Font(R.font.roboto_light_italic, weight = FontWeight.Light, style = FontStyle.Italic),
    Font(R.font.roboto_medium, weight = FontWeight.Medium),
    Font(R.font.roboto_medium_italic, weight = FontWeight.Medium, style = FontStyle.Italic),
    Font(R.font.roboto_regular, weight = FontWeight.Normal),
    Font(R.font.roboto_thin, weight = FontWeight.Thin),
    Font(R.font.roboto_thin_italic, weight = FontWeight.Thin, style = FontStyle.Italic)
)

// Set of Material typography styles to start with
val Typography = Typography(
    body1 = TextStyle(
        fontFamily = fonts,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp
    )
)