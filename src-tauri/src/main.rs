#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use rand::{prelude::SliceRandom, Rng};
use serde::Serialize;
use tauri::generate_handler;

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![gen_quiz_options])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[derive(Debug, Serialize)]
struct QuizOption {
    value: String,
    label: String,
}

fn hh_mm_pair() -> String {
    let mut rng = rand::thread_rng();

    let (n1, n2) = (rng.gen_range(0..=11), rng.gen_range(0..=59));

    let n1 = if n1 < 10 {
        format!("0{n1}")
    } else {
        format!("{n1}")
    };
    let n2 = if n2 < 10 {
        format!("0{n2}")
    } else {
        format!("{n2}")
    };

    format!("{n1}:{n2}")
}

#[tauri::command]
fn gen_quiz_options() -> Vec<QuizOption> {
    let mut rng = rand::thread_rng();
    let mut opts = vec![
        QuizOption {
            value: "A".to_string(),
            label: hh_mm_pair(),
        },
        QuizOption {
            value: "B".to_string(),
            label: hh_mm_pair(),
        },
        QuizOption {
            value: "C".to_string(),
            label: hh_mm_pair(),
        },
        QuizOption {
            value: "D".to_string(),
            label: hh_mm_pair(),
        },
    ];
    opts.shuffle(&mut rng);
    opts
}

#[cfg(test)]
mod tests {
    #[test]
    fn test_gen_options() {
        let opts = crate::gen_quiz_options();
        assert_eq!(opts.len(), 4);
        dbg!(opts);
    }
}
