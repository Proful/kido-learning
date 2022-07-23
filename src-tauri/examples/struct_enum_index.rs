use std::ops::Index;

enum Color {
    Red,
    Green,
    Blue,
}

struct Hex {
    red: String,
    green: String,
    blue: String,
}

impl Index<Color> for Hex {
    type Output = String;

    fn index(&self, index: Color) -> &String {
        match index {
            Color::Red => &self.red,
            Color::Green => &self.green,
            Color::Blue => &self.blue,
        }
    }
}

fn main() {
    let color_dict = Hex {
        red: "ff0000".to_string(),
        green: "00ff00".to_string(),
        blue: "0000ff".to_string(),
    };
    println!("Hex value for Red is {}", color_dict[Color::Red]);
    println!("Hex value for Green is {}", color_dict[Color::Green]);
    println!("Hex value for Blue is {}", color_dict[Color::Blue]);
}
