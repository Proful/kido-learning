use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize)]
pub struct QuizOption {
    pub value: String,
    pub label: String,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct Count {
    pub correct: u32,
    pub incorrect: u32,
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct Scores {
    pub clock: Count,
    pub multiplication: Count,
    pub division: Count,
    pub fraction: Count,
}

impl Scores {
    pub fn new() -> Self {
        Scores {
            clock: Count {
                correct: 0,
                incorrect: 0,
            },
            multiplication: Count {
                correct: 0,
                incorrect: 0,
            },
            division: Count {
                correct: 0,
                incorrect: 0,
            },
            fraction: Count {
                correct: 0,
                incorrect: 0,
            },
        }
    }
}

#[derive(Debug, Serialize, Deserialize, Default)]
pub struct Settings {
    pub denominator: u32,
    pub operation: String,
}

#[derive(Debug, Serialize, Deserialize, Default, Clone)]
pub struct Payload {
    pub message: String,
}
