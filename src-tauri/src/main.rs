#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::fs;

use model::{QuizOption, Scores, Settings};
use rand::prelude::SliceRandom;
use tauri::{generate_handler, CustomMenuItem, Menu, MenuItem, Submenu};
use utils::hh_mm_pair;

use crate::model::Payload;

mod model;
mod utils;

fn main() {
    let reset_scores = CustomMenuItem::new("reset_scores", "Reset Scores").into();
    let submenu = Submenu::new("Edit", Menu::new().add_item(reset_scores));
    let menu = Menu::new()
        .add_native_item(MenuItem::Copy) // not sure why needed? without this `Edit` menu not appearing
        .add_submenu(submenu);

    tauri::Builder::default()
        .invoke_handler(generate_handler![
            gen_quiz_options,
            load_scores,
            save_scores,
            save_settings
        ])
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "reset_scores" => {
                println!("reset scores");
                let scores = Scores::new();
                save_scores(scores);

                let main_window = event.window();
                main_window
                    .emit(
                        "reset_scores",
                        Payload {
                            message: "Tauri is awesome!".into(),
                        },
                    )
                    .unwrap();
            }
            _ => {
                println!("reset scores");
            }
        })
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
