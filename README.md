

Ett modernt, responsivt Kanban-baserat projektverktyg byggt med TypeScript och Firebase.  
Hanterar teammedlemmar och uppgifter med rollbegränsningar, statusflöden och filtrering.

---

## 🚀 Funktionalitet

### 👥 Teammedlemmar
- Lägg till medlem med roll: **UX**, **Frontend**, **Backend**
- Medlemmar visas i en lista med möjlighet att ta bort
- Tillgängliga medlemmar filtreras beroende på vald roll i uppgift

### ✅ Uppgifter
- Skapa uppgift med titel, beskrivning, roll och tilldelad medlem
- Roller styr vem som kan tilldelas en uppgift
- Uppgifter får automatiskt en timestamp

### 🧱 Statusflöde
- Uppgifter visas i kolumner:
  - **Ny**
  - **Under arbete**
  - **Slutförda**
- Knapp för att flytta uppgift mellan kolumner
- Färdiga uppgifter kan tas bort

### 🔎 Filtrering & Sortering
- Filtrera uppgifter baserat på:
  - Roll (UX, Frontend, Backend)
- Sortera:
  - A–Ö / Ö–A
  - Nyast / Äldst

---

## 🛠️ Teknikstack

| Del           | Beskrivning                      |
|---------------|----------------------------------|
| **Frontend**  | TypeScript + HTML + CSS (moduler)|
| **Realtime DB** | Firebase Realtime Database       |
| **UI**        | Responsiv, mörkt tema, modern layout |
| **Hosting**   | *(valfritt)* GitHub Pages eller Firebase Hosting |

---