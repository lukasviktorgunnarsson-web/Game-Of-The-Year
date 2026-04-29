


// export default function moveQuestions() {
//     const cards = document.querySelectorAll<HTMLElement>('.answerBox');
//     const dropZones = document.querySelectorAll<HTMLElement>('.dropZone');

//     cards.forEach(card => {
//         card.addEventListener('dragstart', (e: DragEvent) => {
//             // Vi sparar id:t på kortet som dras
//             const target = e.currentTarget as HTMLElement;
//             if (e.dataTransfer) {
//                 e.dataTransfer.setData('text/plain', target.id);
//                 e.dataTransfer.dropEffect = 'move';
//             }
//         });
//     });

//     // 2. Tillåt att man "drar över" dropzonen (annars kan man inte släppa)
//     dropZones.forEach(dropZone => {
//         dropZone.addEventListener('dragover', (e: DragEvent) => {
//             e.preventDefault(); // Nödvändigt för att tillåta drop
//             if (e.dataTransfer) {
//                 e.dataTransfer.dropEffect = 'move';
//             }
//         });
//     });

//     // 3. Hantera själva släppet (drop)
//     dropZones.forEach(dropZone => {
//         dropZone.addEventListener('drop', (e: DragEvent) => {
//             e.preventDefault();

//             if (e.dataTransfer) {
//                 const cardId = e.dataTransfer.getData('text/plain');
//                 const draggedElement = document.getElementById(cardId);

//                 if (draggedElement) {
//                     // Flytta elementet fysiskt i DOM:en till dropzonen
//                     dropZone.appendChild(draggedElement);
//                 }
//             }
//         });
//     });

// }




// export default function moveQuestions() {
//     const cards = document.querySelectorAll<HTMLElement>('.answerBox');
//     const dropZones = document.querySelectorAll<HTMLElement>('.dropZone');

//     cards.forEach(card => {
//         card.addEventListener('dragstart', (e) => {
//             if (e.dataTransfer) {
//                 console.log("Startar drag för ID:", card.id);
//                 e.dataTransfer.setData('text/plain', card.id);
//                 e.dataTransfer.dropEffect = 'move';
//             }
//         });
//     });

//     dropZones.forEach(dropZone => {
//         dropZone.addEventListener('dragover', (e) => {
//             e.preventDefault(); // Detta tillåter att man släpper
//             if (e.dataTransfer) {
//                 e.dataTransfer.dropEffect = 'move';
//             }
//         });

//         dropZone.addEventListener('drop', (e) => {
//             e.preventDefault();
//             const cardId = e.dataTransfer?.getData('text/plain');
            
//             if (cardId) {
//                 const draggedElement = document.getElementById(cardId);
//                 if (draggedElement) {
//                     dropZone.appendChild(draggedElement);
//                 }
//             }
//         });
//     });
// }