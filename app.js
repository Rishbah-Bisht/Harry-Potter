const search_btn = document.querySelector('#serch_btn');
const card2 = document.querySelector('.card2');
const spell_main = document.querySelector('#spell_main');
const book_main = document.querySelector('#book_main');


document.addEventListener("DOMContentLoaded", async () => {
    console.log("DOM fully loaded and parsed");
    // 1. spellinfo call
    let spellInfo = await getSpellData();
    if (get(spellInfo)) {
        get(spellInfo)
    }
    //2. Book call
    let book = await getBookData()
    getBookInfo(book);
    shoBook();

    // 3. Charcter call
    let hary_chr = await getCharter();
    charInfo(hary_chr)

    // 4. houses
    let hary_house = await gethouseData();
    houseInfo(hary_house)
});


//featching api for spell
async function getSpellData() {
    try {
        const res = await axios.get(`https://potterapi-fedeperin.vercel.app/en/spells`);
        return res
    }
    catch (e) {
        console.log('erroe---->', e);
    }
}

function get(spellInfo) {
    if (spellInfo) {
        spellInfo.data.forEach(spell => {
            const spell_H1 = document.createElement('h1');
            spell_H1.classList.add('spell_H1');
            spell_H1.textContent = `${spell.index + 1}. ${spell.spell}`

            const spell_P = document.createElement('p');
            spell_P.classList.add('spell_P');
            spell_P.textContent = spell.use;

            const card2 = document.createElement('div');
            card2.classList.add('card2');
            // console.log(spell)
            // console.log(spell_H1.textContent)

            card2.append(spell_H1, spell_P);

            if (spell_main) {
                spell_main.appendChild(card2)
            }


        });
    }
}


//fetching api for book's
function shoBook() {
    const bookDiv = document.querySelectorAll('.book');


    console.log('spelll htnll')
    // Loop through each book div
    bookDiv.forEach(bok => {
        bok.addEventListener('click', () => {
            bookDiv.forEach(b => b.classList.remove('active'));
            bok.classList.add('active');

            bok.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling
                block: 'center',    // Align the div to the center of the screen
                inline: 'nearest'   // Horizontal alignment (if applicable)
            });
        });



    });
}





async function getBookData() {
    try {
        const res = await axios.get(`https://potterapi-fedeperin.vercel.app/en/books`);
        return res.data

    }
    catch (e) {
        console.log('erroe---->', e);
    }
}
function getBookInfo(book) {
    if (book) {
        insertBookData(book)
    }
}

function insertBookData(book) {
    book.forEach(book => {
        //Display image 
        const bookCover = document.createElement('img');
        bookCover.classList.add('book-title');
        bookCover.src = book.cover;

        //create boook
        const books = document.createElement('div');
        books.classList.add('book');

        //create box for output
        const div = document.createElement('div');
        div.classList.add('div');


        //create titel
        const title = document.createElement('h1');
        title.classList.add('title');
        title.innerHTML = `<strong >${book.number}. ${book.title}</strong>`;
        div.appendChild(title);

        //create Discription
        const Discription = document.createElement('p');
        Discription.innerHTML = `<strong class="strong"> Description </strong> : ${book.description}`;
        div.appendChild(Discription)


        //create Author
        const author = document.createElement('p');
        author.innerHTML = `<strong class="strong">Author </strong> : J. K. Rowling`;
        div.appendChild(author);


        //create date
        const date = document.createElement('p');
        date.innerHTML = `<strong class="strong">Release Date </strong> : ${book.releaseDate}`;
        div.appendChild(date);


        //create pages
        const pages = document.createElement('p');
        pages.innerHTML = `<strong class="strong">Total No. of Page's </strong> : ${book.pages} page's`;
        div.appendChild(pages);

        books.append(bookCover)
        books.append(div)

        if (book_main)
            book_main.append(books)


    });
}


// Character ............................................................................................................
// Character ............................................................................................................
// Character ............................................................................................................
function toggleExpand(clickedCharacter) {
    const allCharacters = document.querySelectorAll('.character');

    allCharacters.forEach(character => {
        const button = character.querySelector('.more-button');
        const img = character.querySelector('img');
        const characterContent = character.querySelector('.character-footer');

        // If the character isn't the one clicked, collapse it
        if (character !== clickedCharacter) {
            character.classList.remove('expanded');
            button.textContent = 'More...';
            img.style.width = '220px';
            img.style.height = '300px';
            characterContent.style.width = '100%';
        }
    });

    // If the clicked character is not expanded, expand it
    const button = clickedCharacter.querySelector('.more-button');
    const img = clickedCharacter.querySelector('img');
    const characterContent = clickedCharacter.querySelector('.character-footer');
    const displyNoneDiv = clickedCharacter.querySelector('.character-content');
    console.log(displyNoneDiv)

    if (clickedCharacter.classList.contains('expanded')) {
        button.textContent = 'More...';
        img.style.width = '230px';
        img.style.height = '320px';
        characterContent.style.width = '100%';
        displyNoneDiv.style.display = 'none';
        // displyNoneDiv.style.height = '0';
        characterContent.style.padding = '0px';

    } else {
        button.textContent = 'Less...';
        img.style.width = '300px';
        img.style.height = '380px';
        img.style.width = '280px';
        characterContent.style.width = '75%';
        displyNoneDiv.style.display = 'block';
        characterContent.style.padding = '20px';

    }

    clickedCharacter.classList.toggle('expanded');

}

async function getCharter() {
    try {
        let res = await axios.get('https://potterapi-fedeperin.vercel.app/es/characters');
        return res.data;
    } catch (e) {
        console.log('error---->', e);
    }
}

function charInfo(hary_chr) {
    if (hary_chr) {
        hary_chr.forEach(h_ch => {
            const charter_main = document.querySelector('#charter_main');

            const chrter_card = document.createElement('div');
            chrter_card.classList.add('character');
            chrter_card.dataset.characterId = h_ch._id;  // Store unique id for this character

            const characterFooter = document.createElement('div');
            characterFooter.classList.add('character-footer');

            // Insert image
            const img = document.createElement('img');
            img.src = h_ch.image;
            chrter_card.appendChild(img);

            // Insert name of character
            const ch_name = document.createElement('div');
            ch_name.classList.add('character-title');
            ch_name.textContent = h_ch.nickname;
            characterFooter.appendChild(ch_name);

            // Insert house name
            const hogwartsHouse = document.createElement('div');
            hogwartsHouse.classList.add('character-subtitle');
            hogwartsHouse.innerHTML = `<strong>Hogwarts House : </strong>${h_ch.hogwartsHouse}`;
            characterFooter.appendChild(hogwartsHouse);


            // add actor
            const displayDiv = document.createElement('div');
            displayDiv.classList.add('character-content');


            const characterContent = document.createElement('div');
            characterContent.innerHTML = `<strong>Interpreted By : </strong>${h_ch.interpretedBy}`;
            displayDiv.appendChild(characterContent);




            // add Nick name

            const nikname = document.createElement('div');
            nikname.innerHTML = `<strong>Full Name : </strong>${h_ch.fullName}`;
            displayDiv.appendChild(nikname);


            // add date of birth 

            const birthDate = document.createElement('div');
            birthDate.innerHTML = `<strong>Birth Date : </strong>${h_ch.birthdate}`;
            displayDiv.appendChild(birthDate);

            // add Children name



            if (h_ch.children) {
                const childName = document.createElement('div');
                childName.innerHTML = `<strong>Children's :</strong>`;
                displayDiv.appendChild(childName);
                h_ch.children.forEach((chilN, index) => {

                    const childName = document.createElement('div');
                    if (h_ch.children.length === 0) {
                        childName.innerHTML = `<strong>  </strong> No children's`;

                    }
                    else {
                        childName.innerHTML = `<strong>${index + 1} . </strong>${chilN}`;
                    }

                    displayDiv.appendChild(childName);

                })
            }

            // displayDiv.appendChild(childName);
            characterFooter.appendChild(displayDiv);
            chrter_card.appendChild(characterFooter);


            // Insert button
            const moreButton = document.createElement('button');
            moreButton.classList.add('more-button');
            moreButton.textContent = 'more...';
            characterFooter.appendChild(moreButton);


            // Add event listener to the "More" button
            moreButton.addEventListener('click', () => {
                toggleExpand(chrter_card); // Pass the character card itself to the function
                chrter_card.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });


            });

            if (charter_main) {
                charter_main.appendChild(chrter_card);
            }
        });
    }
}



//House ............................................................................................................
//House ............................................................................................................
//House ............................................................................................................

async function gethouseData() {
    try {
        const res = await axios.get(`https://potterapi-fedeperin.vercel.app/es/houses`);
        return res.data

    }
    catch (e) {
        console.log('erroe---->', e);
    }
}







function houseInfo(hary_house) {

    const har_img = [
        { image: 'https://api.deepai.org/job-view-file/20b19a40-cba9-49d9-9644-1b1cf6547ae1/outputs/output.jpg' },
        { image: 'https://api.deepai.org/job-view-file/f8f2bf0e-ed7a-49b4-a9cf-234a0e6730cd/outputs/output.jpg' },
        { image: 'https://api.deepai.org/job-view-file/0c20b0e0-c755-44ca-8307-69aeabbdb2f6/outputs/output.jpg' },
        { image: 'https://api.deepai.org/job-view-file/9beb3271-3b5b-4f9c-b97b-4525ab4af4a8/outputs/output.jpg' },
        // Add other houses as needed...
    ];

    console.log(har_img);

    if (hary_house) {
        hary_house.forEach((house, index) => {
            const house_main = document.querySelector('#house_main'); // Assuming house_main is the container for all house cards.

            // Create the house container
            const houseContainer = document.createElement('div');
            houseContainer.classList.add('houseContainer');

            // Add house image
            const houseImage = document.createElement('img');
            houseImage.src = har_img[index].image || ""; // Get the corresponding image based on index
            houseImage.alt = `${house.house} House Image`;
            houseImage.classList.add('house-image');
            houseContainer.appendChild(houseImage);

            // Create house content
            const houseContent = document.createElement('div');
            houseContent.classList.add('house-content');

            // House title (e.g., Gryffindor House)
            const houseTitle = document.createElement('h2');
            houseTitle.classList.add('house-title');
            houseTitle.innerHTML = `${house.house} House`;
            // Dynamically set house name
            houseContent.appendChild(houseTitle);

            // House location (Hogwarts)
            const houseLocation = document.createElement('p');
            houseLocation.classList.add('house-location');
            houseLocation.innerHTML = `<strong>Founder : </strong> ${house.founder}`;
            houseContent.appendChild(houseLocation);

            // Price info (or anything else you want to display)
            const housePrice = document.createElement('p');
            housePrice.classList.add('house-price');
            housePrice.innerHTML = `<strong>Animal : </strong> ${house.animal}`; // Default price if not provided
            houseContent.appendChild(housePrice);



            // House description
            const houseDescription = document.createElement('p');
            houseDescription.classList.add('house-description');
            houseDescription.innerHTML = `<strong>House Color : </strong>` || `Join the brave and daring members of ${house.house}, known for their courage and chivalry.`;

            houseContent.appendChild(houseDescription);


            house.colors.forEach((colr, index) => {
                const houseDescription = document.createElement('p');
                houseDescription.classList.add('house-description');
                houseDescription.innerHTML = `${index + 1} .  ${colr}`;
                houseContent.appendChild(houseDescription);

            })




            // Append the content to the house container
            houseContainer.appendChild(houseContent);

            // Append the house container to the main container (house_main)
            if (house_main) {
                house_main.appendChild(houseContainer);
            }

        });
    }
}





//for serach

const main_input = document.querySelector('#main_input');

main_input.addEventListener('input', () => {
    // spell html
    const filterSeARCH = main_input.value.toLowerCase();
    const spellDiv = document.querySelectorAll('.card2')
    spellDiv.forEach(spell => {
        const spellName = spell.querySelector('.spell_H1').innerText.toLowerCase();
        const spellUse = spell.querySelector('.spell_P').innerText.toLowerCase();
        if (spellName.includes(filterSeARCH) || spellUse.includes(filterSeARCH)) {
            spell.style.display = ''; // Show matching song
        } else {
            spell.style.display = 'none'; // Hide non-matching song
        }
    })


    //Book html
    const bookDiv = document.querySelectorAll('.book')
    bookDiv.forEach(book => {
        const bookName = book.querySelector('.title').innerText.toLowerCase();
        // const spellUse = book.querySelector('.spell_P').innerText.toLowerCase();
        if (bookName.includes(filterSeARCH) ) {
            book.style.display = ''; // Show matching song
        } else {
            book.style.display = 'none'; // Hide non-matching song
        }
    })


    //charter html
    const chatr = document.querySelectorAll('.character')
    chatr.forEach(chatr => {
        const chtrName = chatr.querySelector('.character-title').innerText.toLowerCase();
        // const spellUse = book.querySelector('.spell_P').innerText.toLowerCase();
        if (chtrName.includes(filterSeARCH) ) {
            chatr.style.display = ''; // Show matching song
        } else {
            chatr.style.display = 'none'; // Hide non-matching song
        }
    })
})













const homeBtn=document.querySelector('.homeBtn');
const showHome=document.querySelector('.show-Home')
homeBtn.addEventListener('mouseover',()=>{
    showHome.style.opacity='1';
})
homeBtn.addEventListener('mouseout',()=>{
    showHome.style.opacity='0';
})