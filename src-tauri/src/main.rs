#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs;

use model::{QuizOption, Scores, Settings};
use rand::prelude::SliceRandom;
use tauri::generate_handler;
use utils::hh_mm_pair;

mod model;
mod utils;

fn main() {
    tauri::Builder::default()
        .invoke_handler(generate_handler![
            gen_quiz_options,
            load_scores,
            save_scores,
            save_settings
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
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

#[tauri::command]
fn load_scores() -> Scores {
    let scores = if let Ok(scores) = fs::read_to_string("/tmp/scores.json") {
        serde_json::from_str(&scores).unwrap_or(Scores::default())
    } else {
        Scores::default()
    };

    scores
}

#[tauri::command]
fn save_scores(scores: Scores) {
    let scores = serde_json::to_string(&scores).unwrap();
    fs::write("/tmp/scores.json", scores).unwrap();
}

#[tauri::command]
fn save_settings(settings: Settings) {
    let settings = serde_json::to_string(&settings).unwrap();
    fs::write("/tmp/settings.json", settings).unwrap();
}

#[cfg(test)]
mod tests {
    use crate::model::{Count, Scores};

    #[test]
    fn test_gen_options() {
        let opts = crate::gen_quiz_options();
        assert_eq!(opts.len(), 4);
        dbg!(opts);
    }
    #[test]
    fn test_load_scores() {
        let scores = crate::load_scores();
        dbg!(scores);
    }
    #[test]
    fn test_save_scores() {
        crate::save_scores(Scores {
            clock: Count {
                correct: 20,
                incorrect: 0,
            },
            multiplication: Count {
                correct: 0,
                incorrect: 10,
            },
            division: Count {
                correct: 20,
                incorrect: 30,
            },
        });
    }
}
