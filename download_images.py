import os
import subprocess
import sys

def check_kaggle_installed():
    try:
        import kaggle
        return True
    except ImportError:
        return False

def install_kaggle():
    print("Installing Kaggle library...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "kaggle"])

def download_datasets():
    datasets = [
        {"id": "abdallahalbin/plantvillage-dataset", "path": "datasets/crops/plantvillage"},
        {"id": "vencerlanz09/pestopia-indian-pests-and-pesticides-dataset", "path": "datasets/pests/pestopia"},
        {"id": "vencerlanz09/agropest-12", "path": "datasets/pests/agropest-12"}
    ]
    
    print("=" * 50)
    print(" AgriShield Image Dataset Downloader")
    print("=" * 50)
    print("\nThis script will download over 100,000 real images of crops and pests.")
    
    # Check for kaggle.json
    kaggle_dir = os.path.expanduser("~/.kaggle")
    kaggle_json_path = os.path.join(kaggle_dir, "kaggle.json")
    
    if not os.path.exists(kaggle_json_path):
        print(f"\n[ERROR] Kaggle API credentials not found at {kaggle_json_path}")
        print("To download these datasets, you need a free Kaggle account:")
        print("  1. Go to https://www.kaggle.com/ and create an account or log in.")
        print("  2. Go to your Account Settings (Profile -> Settings).")
        print("  3. Scroll down to 'API' and click 'Create New Token'.")
        print("  4. A file named 'kaggle.json' will download.")
        print(f"  5. Place that file in this folder: {kaggle_dir}")
        print("  6. Run this script again.")
        return

    import kaggle

    for ds in datasets:
        print(f"\nDownloading dataset: {ds['id']}...")
        os.makedirs(ds['path'], exist_ok=True)
        try:
            kaggle.api.dataset_download_files(ds['id'], path=ds['path'], unzip=True)
            print(f"Successfully downloaded and extracted to {ds['path']}")
        except Exception as e:
            print(f"Error downloading {ds['id']}: {e}")

    print("\nAll downloads complete!")

if __name__ == "__main__":
    if not check_kaggle_installed():
        install_kaggle()
    
    download_datasets()
