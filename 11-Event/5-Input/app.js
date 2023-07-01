inputdrink = document.getElementById("ad")

// inputdrink.addEventListener("focus", log)
// inputdrink.addEventListener("blur", log)
// inputdrink.addEventListener("paste", log)
//inputdrink.addEventListener("copy", log)
//inputdrink.addEventListener("cut", log)
inputdrink.addEventListener("select", log)

function log(e) {
    console.log(e.type)
  //  console.log(document.getSelection())
   
}