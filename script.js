
    // === Demo Results ===
    const demoResults = {
      "1": {name:"Student A",marks:"1080/1100",grade:"A+"},
      "2": {name:"Student B",marks:"1055/1100",grade:"A"},
      "3": {name:"Student C",marks:"980/1100",grade:"A-"}
    };

    function lookupResult(){
      const r = document.getElementById('rollInput').value.trim();
      const area = document.getElementById('resultArea');
      if(!r){ area.innerText = "Please enter a roll number."; return; }
      const rec = demoResults[r];
      if(!rec) {
        area.innerText = "No record found (demo).";
      } else {
        area.innerHTML = `${rec.name} — ${rec.marks} — Grade: ${rec.grade}`;
      }
    }

    // === Daily Post System ===
    const APPROVAL_KEY = "kkcollege2025"; // Sir's secret key
    const postList = document.getElementById("postList");

    function loadPosts(){
      const posts = JSON.parse(localStorage.getItem("collegePosts") || "[]");
      postList.innerHTML = "";
      posts.forEach((p, i)=>{
        const div = document.createElement("div");
        div.className = "post";
        div.innerHTML = `
          <div class="meta">${p.date}</div>
          <div class="content">${p.content}</div>
          ${p.image ? `<img src="${p.image}" style="max-width:100%;margin-top:8px;border-radius:8px;border:1px solid rgba(0,255,0,0.06)">` : ""}
          <button onclick="deletePost(${i})" style="margin-top:6px;font-size:12px">Delete</button>
        `;
        postList.prepend(div);
      });
    }

    function submitPost(){
      const content = document.getElementById("postContent").value.trim();
      const key = document.getElementById("approvalKey").value.trim();
      const file = document.getElementById("postImage").files[0];

      if(!content && !file){ alert("❌ Write something or select an image!"); return; }
      if(key !== APPROVAL_KEY){ alert("❌ Invalid Approval Key!"); return; }

      if(file){
        const reader = new FileReader();
        reader.onload = function(e){ savePost(content, e.target.result); }
        reader.readAsDataURL(file);
      } else {
        savePost(content, null);
      }
    }

    function savePost(content, image){
      const posts = JSON.parse(localStorage.getItem("collegePosts") || "[]");
      posts.push({content, image, date:new Date().toLocaleString()});
      localStorage.setItem("collegePosts", JSON.stringify(posts));
      document.getElementById("postContent").value = "";
      document.getElementById("approvalKey").value = "";
      document.getElementById("postImage").value = "";
      loadPosts();
    }

    function deletePost(index){
      const key = prompt("Enter approval key to delete this post:");
      if(key !== APPROVAL_KEY){ alert("❌ Invalid Key!"); return; }
      const posts = JSON.parse(localStorage.getItem("collegePosts") || "[]");
      posts.splice(index,1);
      localStorage.setItem("collegePosts", JSON.stringify(posts));
      loadPosts();
    }

    loadPosts();