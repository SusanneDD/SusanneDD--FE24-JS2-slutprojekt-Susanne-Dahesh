import { membersRef, db } from "./firebase";
import { Member } from "./models";
import { push, onValue, remove, ref } from "firebase/database";

let allMembers: Member[] = [];

export function setupMemberListeners(updateAssignableMembers: () => void) {
  document.getElementById("add-member-btn")!.addEventListener("click", () => {
    const name = (document.getElementById("member-name") as HTMLInputElement).value;
    const role = (document.getElementById("member-role") as HTMLSelectElement).value;
    if (name && role) {
      push(membersRef, { name, role });
    }
  });

  onValue(membersRef, snapshot => {
    const list = document.getElementById("member-list")!;
    list.innerHTML = "";
    allMembers = [];

    snapshot.forEach(child => {
      const val = child.val();
      allMembers.push({ key: child.key!, name: val.name, role: val.role });

      const li = document.createElement("li");
      li.textContent = `${val.name} (${val.role}) `;

      const delBtn = document.createElement("button");
      delBtn.textContent = "🗑️";
      delBtn.style.marginLeft = "10px";
      delBtn.style.backgroundColor = "#aa3333";
      delBtn.style.border = "none";
      delBtn.style.color = "#fff";
      delBtn.style.borderRadius = "4px";
      delBtn.style.cursor = "pointer";
      delBtn.onclick = () => remove(ref(db, "members/" + child.key));

      li.appendChild(delBtn);
      list.appendChild(li);
    });

    updateAssignableMembers();
  });
}

export function updateAssignableMembers() {
  const role = (document.getElementById("task-role") as HTMLSelectElement).value;
  const memberSelect = document.getElementById("task-member") as HTMLSelectElement;
  memberSelect.innerHTML = "";

  allMembers
    .filter(m => m.role === role)
    .forEach(m => {
      const opt = document.createElement("option");
      opt.value = m.key!;
      opt.textContent = m.name;
      memberSelect.appendChild(opt);
    });
}
