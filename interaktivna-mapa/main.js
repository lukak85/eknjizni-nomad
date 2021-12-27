import { OBJLoader } from './js/examples/OBJLoader.js';
import { GLTFLoader } from './js/examples/GLTFLoader.js';
import { OrbitControls } from './js/examples/OrbitControls.js'
import { TransformControls } from './js/examples/TransformControls.js'
import { Clock, LineBasicMaterial, Raycaster, Vector2, Vector3 } from './js/build/three.module.js';

// --------------------------------------------------
// Global variables
// --------------------------------------------------

var IS_ADMIN = true;
var EDIT_MODE = false;

// 0 - add, 1 - remove
var EDIT_MODE_M = 0;

var clock = new THREE.Clock();

// --------------------------------------------------
// Button event listeners
// --------------------------------------------------

// Open actions by clicking FAB
document.getElementById("fab").addEventListener("click", () => {
    // Display floating action buttons
    let fabVisible = document.getElementById("fabButtons").style.visibility;

    console.log(fabVisible);

    if (fabVisible == "visible") {
        document.getElementById("fabButtons").style.visibility = "hidden";

        // Execute animation for FAB button
        document.getElementById("fab").style.transform = "rotate(45deg)";
    } else {
        document.getElementById("fabButtons").style.visibility = "visible";

        // Execute animation for FAB button
        document.getElementById("fab").style.transform = "rotate(0deg)";
    }

    // Exit edit mode if inside it
    EDIT_MODE = false;
    document.getElementById("addMoveRemove").style.visibility = "hidden";
}, false);

// Display info when clicking on info button
document.getElementById("infoButton").addEventListener("click", () => {
    // Display inf screen
    document.getElementById("infoScreen").style.visibility = "visible";
}, false);

document.getElementById("editButton").addEventListener("click", () => {
    if (IS_ADMIN) {
        if (!EDIT_MODE) {
            EDIT_MODE = true;
            document.getElementById("addMoveRemove").style.visibility = "inherit";
        } else {
            EDIT_MODE = false;
            document.getElementById("addMoveRemove").style.visibility = "hidden";
        }
    } else {
        EDIT_MODE = false;
        console.log("Admin privileges required");
    }

    setActiveEditButtons();
});

document.getElementById("addButton").addEventListener("click", () => { EDIT_MODE_M = 0; setActiveEditButtons();});
document.getElementById("removeButton").addEventListener("click", () => { EDIT_MODE_M = 1; setActiveEditButtons();});
document.getElementById("renameButton").addEventListener("click", () => { EDIT_MODE_M = 2; setActiveEditButtons();});

function setActiveEditButtons() {
    // --------------------------------------------------
    // Color the buttons appropriatelly according to
    // what edit mode we're in
    // --------------------------------------------------

    var editModesColor = document.getElementById('addMoveRemove').getElementsByTagName('img');

    console.log(editModesColor);

    for (let i = 0; i < editModesColor.length; i++) {
        if (i == EDIT_MODE_M) {
            editModesColor[i].style.opacity = 0.3;
        } else {
            editModesColor[i].style.opacity = 1;
        }
    }
}

document.getElementById("infoScreen").addEventListener("click", () => {
    document.getElementById("infoScreen").style.visibility = "hidden";
});

// Save json file

document.getElementById("saveButton").addEventListener("click", () => {
    function download(content, fileName, contentType) {
        var a = document.createElement("a");
        var file = new Blob([content], {type: contentType});
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
    }
    download(JSON.stringify(locations), 'locations.json', 'text/plain');
});

// --------------------------------------------------
// Loading .obj and .glb files
// --------------------------------------------------

// Instantiate both loaders
const loader = new OBJLoader();
const loaderg = new GLTFLoader();

// Load buildings
loaderg.load(
	'./media/obj/Ljubljana.glb',
	// Called when resource is loaded
	function ( object ) {
		scene.add( object.scene );
        document.getElementById("welcomeScreen").style.visibility = "hidden";
        loadLocations();
	},
	// Called when loading is in progresses
	function ( xhr ) {
        document.getElementById("myBar").style.width = xhr.loaded / xhr.total + "%";
		console.log( ( xhr.loaded / xhr.total) + '% loaded' );
	},
	// Called when loading has errors
	function ( error ) {
        console.log(error);
		console.log( 'An error happened' );
	}
);


// --------------------------------------------------
// Loading locations
// --------------------------------------------------

var locations;

function loadLocations() {
    $.ajaxSetup({async: false, cache: false});
    $.getJSON("data/locations.json", function(json) {
        locations = json;
        console.log(locations);
    });

    displayScene();
}

// --------------------------------------------------
// Form save variable
// --------------------------------------------------

var currentEditing;


// --------------------------------------------------
// Setting up window
// --------------------------------------------------

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.gammaOutput = true;
renderer.gammaFactor = 2.2;


// --------------------------------------------------
// Setting up orbit controller
// --------------------------------------------------

var controls = new OrbitControls(camera, renderer.domElement);


// --------------------------------------------------
// Resizing window
// --------------------------------------------------

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    if (window.innerHeight > window.innerWidth)
    renderer.antialias = false;
    else
    renderer.antialias = true;
}

// --------------------------------------------------
// Displaying the scene
// --------------------------------------------------

function displayScene() {

    // --------------------------------------------------
    // Scene setup
    // --------------------------------------------------

    var sceneBackground = getComputedStyle(document.body).getPropertyValue('--main-background-color');
    scene.background = new THREE.Color(parseInt(sceneBackground.replace("#","0x"), 16));

    // Adding fog to the scene
    scene.fog = new THREE.Fog(scene.background, 0.0015, 2000);

    // Adding light
    const hemisphereLight = new THREE.HemisphereLight( 0xffffff, 20 );
    scene.add( hemisphereLight );

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.1 );
    scene.add( directionalLight );


    // --------------------------------------------------
    // Add locations
    // --------------------------------------------------
    
    const geometry = new THREE.SphereGeometry(10, 10, 10);

    for (let i in locations) {
        const sphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color: 0xffff00 } ));

        sphere.position.x = locations[i].x;
        sphere.position.y = locations[i].y;
        sphere.position.z = locations[i].z;
        
        scene.add(sphere);

        locations[i].sphereId = scene.children[scene.children.length - 1].uuid;
    }


    // --------------------------------------------------
    // Camera setup
    // --------------------------------------------------
    
    camera.position.set(14.5247841, -25, 46.0536002);
    
    controls.target = new Vector3(-14.5247841, 100, -46.0536002);
    var newTarget = new Vector3(-14.5247841, 100, -46.0536002);

    controls.maxPolarAngle = Math.PI / 3;
    controls.minPolarAngle = Math.PI / 12;
    controls.minDistance = 300;
    controls.maxDistance = 1000;

    controls.enableDamping = true;
    controls.enablePan = false;


    // --------------------------------------------------
    // Adding all the cubes into scene
    // --------------------------------------------------
    
    var mouse = new Vector2();
    var raycaster = new Raycaster();
    

    // --------------------------------------------------
    // Remember which object was last clicked, so we can 
    // change its color back to normal
    // --------------------------------------------------
    
    var lastClicked = null;

    
    // --------------------------------------------------
    // Log all objects currently in scene
    // --------------------------------------------------

    console.log(scene);

    
    // --------------------------------------------------
    // Control what happens when mouse button is clicked
    // --------------------------------------------------
    
    // Movement gizmo
    var moveControl = null;

    
    document.getElementsByTagName("canvas")[0].addEventListener('mousedown', (event) => {

        event.preventDefault();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        
        // --------------------------------------------------
        // Check if the movement gizmo is present, if it is,
        // delete it
        // --------------------------------------------------

        if(EDIT_MODE_M != 1 && moveControl != null) {
            scene.remove(moveControl);
            moveControl.object.geometry.dispose();
            moveControl.object.material.dispose();
            moveControl.object = undefined;

            moveControl = null;
        }


        // --------------------------------------------------
        // Check if we're in edit mode
        // --------------------------------------------------

        if (EDIT_MODE) {

            var intersects;


            // Check which type of edit mode we're in
            switch (EDIT_MODE_M) {
                case 2:
                    // Rename a point and edit its details
                    intersects = raycaster.intersectObjects(scene.children, false);

                    if (intersects.length > 0) {
                        var i = 0;

                        while (intersects[i].object.type != "Mesh")
                            i++;

                        const objectId = intersects[i].object.uuid;

                        for (let i in locations) {
                            if(objectId == locations[i].sphereId) {

                                currentEditing = i;

                                console.log("Changing location information");
                                console.log(locations[i])

                                $(".text").empty();
                                $("#popup").append(
                                    '<div class="text">' +
                                        '<label for="inputLocName">Ime lokacije</label>' +
                                        '<br>' +
                                        '<input id="inputLocName" type="text" value="' + locations[i].name + '" />' +
                                        '<br>' +
                                        '<label for="inputLocLoc">Lokacija</label>' +
                                        '<br>' +
                                        '<input id="inputLocLoc" type="text" value="' + locations[i].location + '" />' +
                                        '<br>' +
                                        '<label for="inputImageRef">Ime slike</label>' +
                                        '<br>' +
                                        '<input id="inputImageRef" type="text" value="' + locations[i].imageRef + '" />' +
                                        '<br>' +
                                        '<label for="inputText">Tekst</label>' +
                                        '<br>' +
                                        '<textarea id="inputText" value="' + locations[i].text + '" />' +
                                        '<br>' +
                                        '<label for="inputLitInfo">Delo</label>' +
                                        '<br>' +
                                        '<input id="inputLitInfo" type="text" value="' + locations[i].literatureInfo + '" />' +
                                        '<br>' +
                                        '<div id="adButtonContainer">' +
                                        '<button id="inputAccept"><img src="media/img/check_white_24dp.svg" /></button><button id="inputDecline"><img src="media/img/close_white_24dp.svg" /></button>' +
                                        '</div>' +
                                    '</div>'
                                );
                                $("#popup").show();

                                const r = document.querySelector(':root');
                                r.style.setProperty('--popup-visibility', 'visible');

                                document.getElementById("inputAccept").addEventListener("click", () => {
                                    locations[currentEditing].name = document.getElementById("inputLocName").value;
                                    locations[currentEditing].location = document.getElementById("inputLocLoc").value;
                                    locations[currentEditing].imageRef = document.getElementById("inputImageRef").value;
                                    locations[currentEditing].text = document.getElementById("inputText").value;
                                    locations[currentEditing].literatureInfo = document.getElementById("inputLitInfo").value;
                                    document.getElementById("popup").style.visibility = "hidden";
                                    console.log("Saved information");
                                });
                                
                                document.getElementById("inputDecline").addEventListener("click", () => {
                                    const r = document.querySelector(':root');
                                    r.style.setProperty('--popup-visibility', 'hidden');
                                    console.log("Canceled");
                                });
                            }
                        }

                    }

                    break;
                case 1:
                    // Remove a point
                    intersects = raycaster.intersectObjects(scene.children, false);

                    console.log(intersects);

                    if (intersects.length > 0) {
                        var i = 0;

                        while (intersects[i].object.type != "Mesh")
                            i++;

                        const objectId = intersects[i].object.uuid;

                        scene.remove(intersects[i].object);
                        intersects[i].object.geometry.dispose();
                        intersects[i].object.material.dispose();
                        intersects[i].object = undefined;

                        console.log("Location removed");

                        for (let i in locations) {
                            if(objectId == locations[i].sphereId) {
                                locations.splice(i, 1);
                            }
                        }

                        console.log("Current locations:")
                        console.log(locations);
                    }

                    break;
                default:
                    // Add a point
                    intersects = raycaster.intersectObject(scene.children[0].children[1], false);

                    console.log(intersects);

                    if (intersects.length > 0) {
                        const newLocation = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial( { color: 0xffff00 } ));

                        newLocation.position.x = intersects[0].point.x; 
                        newLocation.position.y = intersects[0].point.y + 50;
                        newLocation.position.z = intersects[0].point.z;

                        scene.add(newLocation);

                        const jsonObj = {
                            "x": newLocation.position.x,
                            "y": newLocation.position.y,
                            "z": newLocation.position.z,
                            "sphereId": newLocation.uuid
                        }

                        console.log(jsonObj);
                        console.log(locations);

                        locations.push(jsonObj)

                        console.log("Location added")
                        console.log("Current locations:")
                        console.log(locations)
                    }

                    break;
            }

        } else {

            // Otherwise we're not in edit more

            if (lastClicked != null)
                lastClicked.material.color.set(0xffff00);
            
            const intersects = raycaster.intersectObjects(scene.children, false);

            console.log(intersects);

            if (intersects.length > 0) {
                lastClicked = intersects[0].object;
                intersects[0].object.material.color.set(0x00ff00);
                console.log("Clicked an object");

                // Make the clicked object a new target for camera, then
                // gradually move towards it in the animate function
                const objectPosition = intersects[0].object.position;
                newTarget = objectPosition;

                // Get the id of the object clicked, and with that, its info
                let sphereInfo;

                for (let i in locations) {
                    if (locations[i].sphereId == intersects[0].object.uuid) {

                        // Display popup
                        const displayText = locations[i].text;
                        const imageSource = "./data/pesmi-lokacije/slike/" + locations[i].imageRef;
                        const locationName = locations[i].name;
                        const locationStr = locations[i].location;
                        const literatureInfo = locations[i].literatureInfo;
                        const imageQR = "./media/img/QR_code_for_mobile_English_Wikipedia.svg.png"

                        $(".text").empty();
                        $("#popup").append(
                            '<div class="text">' +
                                '<h2 id="locationName">' + locationName + '</h2>' +
                                '<h3 id="locationName">' + locationStr + '</h3>' +
                                '<p id="locationText">' + displayText + '</p>' +
                                '<p id="literatureInfo">' + literatureInfo + '</p>'+
                                '<img id="codeQR" class="locationImage" src="' + imageQR + '" />' +
                                '<br>' +
                                '<img class="locationImage" src="' + imageSource + '" />' +
                            '</div>'
                        );
                        $("#popup").show();

                        const r = document.querySelector(':root');
                        r.style.setProperty('--popup-visibility', 'visible');

                        break;
                    }
                }
            } else {
                // If the click is outside the popup, make the popup
                // hidden, otherwise do nothing
                if (!document.getElementById('popup').contains(event.target)) {
                    const r = document.querySelector(':root');
                    r.style.setProperty('--popup-visibility', 'hidden');
                }
            }

        }

    }, false);

    function smoothCameraAnimation(speed) {
        const movementVec = new Vector3(
            newTarget.x - controls.target.x,
            newTarget.y - controls.target.y,
            newTarget.z - controls.target.z
        );

        controls.target.set(
            (movementVec.x * speed + controls.target.x),
            (movementVec.y * speed + controls.target.y),
            (movementVec.z * speed + controls.target.z)
        );

        const epsilon = movementVec.length();
        const treshold = 0.01;

        if (epsilon < treshold) {
            controls.target.x = newTarget.x;
            controls.target.y = newTarget.y;
            controls.target.z = newTarget.z;
        }
    }
    
    const animate = function () {
        requestAnimationFrame( animate );

        smoothCameraAnimation(0.75 * clock.getDelta());

        controls.update();        

        renderer.render( scene, camera );
    };

    animate();

}