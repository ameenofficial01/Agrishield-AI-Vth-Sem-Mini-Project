def get_recommendations(crop: str, pest: str, risk_level: str):
    title = f"Advisory for {pest} in {crop}"
    body = f"Risk is currently {risk_level}. "
    
    if risk_level == "High":
        body += "Immediate action required. Consider applying recommended pesticides and clearing affected plant parts. Monitor daily."
    elif risk_level == "Medium":
        body += "Monitor field closely. Implement preventive measures such as proper spacing, weed control, and removing debris. Prepare for possible treatment."
    else:
        body += "Maintain regular field hygiene and standard monitoring practices. Current environmental conditions are not highly conducive to a severe outbreak."
        
    return title, body
