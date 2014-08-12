function loadfile() {
  window.rows = [];

  function load() {
    var File, reader;
    File = this.files[0];
    if (!File.name.match('\.csv$')) {
      return;
    }
    file.textContent = File.name;
    reader = new FileReader();
    reader.onload = function(file) {
      this.result.split('\n').map(function(row) {
        if (row.match(/^\d/)) {
          window.rows.push(row.split(','));
        }
      });
      data.textContent = this.result; //shows contents of file
    };
    reader.readAsText(File);
  };
  
  document.getElementById("chooser").style.display="none"; //makes Submit button invisible
  //link Submit button and text
  chooser.addEventListener('change', load);
  file.addEventListener('click', function() {
    chooser.click();
  });
};

function sendForm() {
  var formData = new FormData();
  var fname = document.getElementById("firstname").value;
  var lname = document.getElementById("lastname").value;
  var uploadedFile = document.getElementById("chooser").files[0];
  formData.append("fname", fname);
  formData.append("lname", lname);
  formData.append("files", uploadedFile);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8000/api/post", true);
  xhr.onload = function(e) {
    if (this.status==200) {
      console.log("Form sent!");
    }
  };
  xhr.send(formData);
};


function submitFunc() {
  document.getElementById("submit").innerHTML = "Submitted!"
  document.getElementById("submit").disabled = true;
  sendForm();
};

function resetFunc() {
  document.getElementById("file").innerHTML = "Click here to upload";
  document.getElementById("submit").innerHTML = "Submit"
  document.getElementById("submit").disabled = false;
  document.getElementById("data").innerHTML = "(File Contents)";
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
};

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

var files = evt.dataTransfer.files; // FileList object.

// files is a FileList of File objects. List some properties.
var output = [];
   for (var i = 0, f; f = files[i]; i++) {
   output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
    f.size, ' bytes, last modified: ',
    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
  '</li>');
   }
document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

// Setup the dnd listeners.
var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);


loadfile();





