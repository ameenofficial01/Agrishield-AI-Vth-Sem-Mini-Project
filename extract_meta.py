import pandas as pd
import json

df = pd.read_csv('AgriShield_Full_ML_Dataset_Karnataka_Kerala.csv')

states = df['State'].unique().tolist()
crops = sorted(df['Crop'].unique().tolist())
crop_pests = {c: sorted(df[df['Crop'] == c]['Pest'].unique().tolist()) for c in crops}

state_districts = {}
for state in states:
    dists = sorted(df[df['State'] == state]['District'].unique().tolist())
    state_districts[state] = dists

district_taluks = {}
for dist in df['District'].unique():
    taluks = sorted(df[df['District'] == dist]['Taluk'].unique().tolist())
    district_taluks[dist] = taluks

print(f"States: {len(states)}")
print(f"Crops: {len(crops)}")
print(f"Districts in Karnataka: {len(state_districts.get('Karnataka', []))}")
print(f"Districts in Kerala: {len(state_districts.get('Kerala', []))}")
print(f"Total Unique Pests: {df['Pest'].nunique()}")
