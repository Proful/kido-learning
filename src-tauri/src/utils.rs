use rand::Rng;

pub fn hh_mm_pair() -> String {
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
