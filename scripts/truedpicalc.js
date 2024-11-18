```True DPI Calculation Script```
        
function calculateTrueDPI(event) {            
    event.preventDefault();
    // Get the current and desired DPI from the input fields          
    const currentDPI = parseFloat(document.getElementById('currentDPI').value);   
    const desiredDPI = parseFloat(document.getElementById('desiredDPI').value);
    // Get the current and desired Windows Sensitivity multipliers        
    const currentSensitivity = parseFloat(document.getElementById('currentSensitivity').value);        
    const desiredSensitivity = parseFloat(document.getElementById('desiredSensitivity').value);
    // Check if inputs are valid  
    if (!isNaN(currentDPI) && !isNaN(desiredDPI) && !isNaN(currentSensitivity) && !isNaN(desiredSensitivity) && desiredDPI !== 0) {           
        // Calculate the effective multiplier considering both DPI and Windows Sensitivity         
        const multiplier = (desiredDPI / currentDPI) * (currentSensitivity / desiredSensitivity);          
        document.getElementById('resultTrueSens').textContent = `Multiply your current DPI by: ${multiplier.toFixed(5)} to achieve your desired DPI with the new sensitivity.`;          
        document.getElementById('resultTrueSens').style.textDecoration = 'underline';          
        document.getElementById('resultTrueSens').style.fontSize = '20px';      
    } else {          
        document.getElementById('resultTrueSens').textContent = 'Please enter valid values for DPI and Sensitivity!';         
        document.getElementById('resultTrueSens').style.textDecoration = 'underline';        
        document.getElementById('resultTrueSens').style.fontSize = '20px';   
    }  
}
   
function calculatePPI(resWidth, resHeight, monitorSize) {        
    return Math.sqrt((resWidth ** 2) + (resHeight ** 2)) / monitorSize;    
}
    
function scalingDPI(event) {         
    event.preventDefault();        
    // Get input values        
    const currentMonitor = parseFloat(document.getElementById('currentMonitor').value);         
    const newMonitor = parseFloat(document.getElementById('newMonitor').value);        
    const currentWidth = parseFloat(document.getElementById('currentWidth').value);       
    const currentHeight = parseFloat(document.getElementById('currentHeight').value);       
    const newWidth = parseFloat(document.getElementById('newWidth').value);      
    const newHeight = parseFloat(document.getElementById('newHeight').value);      
    const DPI = parseFloat(document.getElementById('DPI').value);       
    // Get sensitivity multipliers       
    const currentSensitivity = parseFloat(document.getElementById('currentSensitivityRes').value);       
    const desiredSensitivity = parseFloat(document.getElementById('desiredSensitivityRes').value);
    // Validate inputs      
    if (!isNaN(currentWidth) && !isNaN(currentHeight) && !isNaN(newWidth) && !isNaN(newHeight) && !isNaN(DPI)) {          
        let newDPI;         
        const useMonitorSize = document.getElementById('perceivedSensitivity').checked;         
        if (useMonitorSize && !isNaN(currentMonitor) && !isNaN(newMonitor)) {             
            const currentPPI = calculatePPI(currentWidth, currentHeight, currentMonitor);             
            const newPPI = calculatePPI(newWidth, newHeight, newMonitor);            
            newDPI = DPI * (newPPI / currentPPI);        
        } else {          
            newDPI = DPI * (newWidth / currentWidth);      
        }        
        // Apply sensitivity scaling       
        newDPI = newDPI * (currentSensitivity / desiredSensitivity);      
        document.getElementById('resultScaler').textContent = `Your new DPI should be approximately: ${newDPI.toFixed(2)}`;      
        document.getElementById('resultScaler').style.textDecoration = 'underline';      
        document.getElementById('resultScaler').style.fontSize = '20px';   
    } else {      
        document.getElementById('resultScaler').textContent = 'Please fill out all fields with valid numbers!';       
        document.getElementById('resultScaler').style.textDecoration = 'underline';       
        document.getElementById('resultScaler').style.fontSize = '20px';   
    } 
}

function toggleMonitorInputs() {       
    const usePerceivedSensitivity = document.getElementById('perceivedSensitivity').checked;      
    const monitorInputs = ['currentMonitor', 'newMonitor'];
      
    monitorInputs.forEach(id => {         
        const inputElement = document.getElementById(id);        
        inputElement.disabled = !usePerceivedSensitivity;    
    });    
}
       
function toggleMonitorInputs() {     
    const usePerceivedSensitivity = document.getElementById('perceivedSensitivity').checked;     
    document.getElementById('currentMonitor').disabled = !usePerceivedSensitivity;      
    document.getElementById('newMonitor').disabled = !usePerceivedSensitivity;   
}
