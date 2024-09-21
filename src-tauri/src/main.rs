// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use std::fs::{self, File, OpenOptions};
// use std::io::Write;
// use std::path::PathBuf;
// use tauri::api::dialog::FileDialogBuilder;


// #[tauri::command]
// async fn select_folder() -> Option<String> {
//     let path = FileDialogBuilder::new()
//         .pick_folder()
//         .await;

//     path.map(|p| p.to_string_lossy().to_string())
// }

// #[tauri::command]
// fn save_file(file_name: &str, content: &str, folder_path: &str) -> Option<String> {
//     // Construct the file path
//     let file_path = format!("{}/{}", folder_path, file_name);

//     // Create and write to the file
//     match File::create(&file_path) {
//         Ok(mut file) => {
//             if let Err(err) = file.write_all(content.as_bytes()) {
//                 println!("Error writing file: {}", err);
//                 return None;
//             }
//             Some(file_path) // Return the saved file path
//         }
//         Err(err) => {
//             println!("Error creating file: {}", err);
//             None
//         }
//     }
// }

// #[tauri::command]
// async fn save_as_file(file_path:&str,content: &str) -> Result<(), String> {
//     let path = FileDialogBuilder::new()
//         .save_file()
//         .await
//         .ok_or("Failed to open file dialog")?;

//     let mut file = File::create(path).map_err(|e| e.to_string())?;
//     file.write_all(content.as_bytes()).map_err(|e| e.to_string())?;
//     Ok(())
// }

// #[tauri::command]
// fn read_file(path: String) -> (String, String) {
//     let path_with_ext = format!("{}.txt", &path);
//     let path_to_file = PathBuf::from(PATH.lock().unwrap().clone()).join(path_with_ext);

//     if let Ok(contents) = fs::read_to_string(path_to_file) {
//         return (path, contents);
//     } else {
//         return ("".to_string(), "".to_string());
//     }
// }

// #[tauri::command]
// fn update_file(filepath: &str, new_content: &str) -> Result<(), String> {
//     // Open the file in append mode
//     let mut file = OpenOptions::new()
//         .write(true)
//         .open(filepath)
//         .map_err(|e| e.to_string())?;

//     // Write the new content to the file
//     file.write_all(new_content.as_bytes())
//         .map_err(|e| e.to_string())?;

//     Ok(())
// }


// // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// // #[tauri::command]
// // fn greet(name: &str) -> String {
// //     format!("Hello, {}! You've been greeted from Rust!", name)
// // }

// // rename window
// #[tauri::command]
// fn set_window_title(window: tauri::Window, title: String) {
//     window.set_title(&title).unwrap();
// }

// #[tauri::command]
// fn toggle_fullscreen(window: tauri::Window) {
//     let is_fullscreen = window.is_fullscreen().unwrap_or(false);
//     window.set_fullscreen(!is_fullscreen).unwrap(); 
// }

// #[tauri::command]
// fn toggle_always_on_top(window: tauri::Window){
//     // window.get_window(label)
//     // let is_always_on_top = window
//     // ().unwrap_or(false);
//     // window.set_always_on_top(!is_always_on_top).unwrap();
// }
// 
fn main() {
    tauri::Builder::default()
        // .invoke_handler(tauri::generate_handler![
        //     set_window_title, 
        //     toggle_fullscreen,
        //     // toggle_always_on_top
        //     read_file,
        //     update_file,
        //     save_file,
        //     save_as_file,
        //     select_folder,
        //     ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
