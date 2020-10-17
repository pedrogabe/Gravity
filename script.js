var creatorSettingsVisible=true;
function toggleCreatorSettings(button){
    creatorSettingsVisible=!creatorSettingsVisible;
    if(creatorSettingsVisible){
        document.getElementById('creatorSettings').style.display='unset';
        button.innerHTML='>';
    }else{
        document.getElementById('creatorSettings').style.display='none';
        button.innerHTML='<';
    }
}

function updateValues(value, changingElement){
    if(value=='size'){
        if(changingElement.id=='sizeRange'){
            document.getElementById('sizeNumber').value=changingElement.value;
        }else{
            document.getElementById('sizeRange').value=changingElement.value;
        }
        newRadius=changingElement.value;
        newMass=newRadius*document.getElementById('density').value;
        document.getElementById('mass').innerHTML="Masa = "+newMass;
    }
    else if(value=='density'){
        document.getElementById('mass').innerHTML="Masa = "+changingElement.value*document.getElementById('sizeNumber').value;
    }
    else if(value=='color'){
        let r = document.getElementById('R').value;
        let g = document.getElementById('G').value;
        let b = document.getElementById('B').value;
        newColor="rgb("+r+','+g+','+b+')';
        document.getElementById('colorSample').style.backgroundColor=newColor;
    }else if(value=='gravity'){
        gravityCoefficient=changingElement.value;
    }
}