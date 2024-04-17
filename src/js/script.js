(() => {
  const quotesList = document.querySelector('#quotes-from-others');
  const btnNewQuote = document.querySelector('#btnNewQuote');

  btnNewQuote.addEventListener('click', () => {
    const url = 'http://localhost:3001';

    fetch(url)
      .then(response => response.json())
      .then(data => {
//         <figure class="quote">
        //   <blockquote>
        //     But web browsers aren’t like web servers. If your back-end code is getting so big that it’s starting to run noticably slowly, you can throw more computing power at it by scaling up your server. That’s not an option on the front-end where you don’t really have one run-time environment—your end users have their own run-time environment with its own constraints around computing power and network connectivity.
        //   </blockquote>
        //   <figcaption>
      //     — Jeremy Keith, <cite>Mental models</cite>
        //   </figcaption>
        // </figure>
        const quote = document.createElement('figure');
        // const quoteBlock = document.createElement('blockquote');
        const quoteTitle = document.createElement('blockquote');
        const quoteAuthor = document.createElement('figcaption');
        const item = document.createElement('li');

        quote.classList.add('quote__block');
        quoteTitle.classList.add('quote__title');
        quoteAuthor.classList.add('quote__author');
        quote.append(quoteTitle, quoteAuthor)
        item.append(quote);

        console.log(data.quoteAuthor);
        quoteTitle.textContent = data.quoteText;
        quoteAuthor.innerHTML = `&copy; ${data.quoteAuthor || 'Неивестный автор'}`;

        if (quotesList.children.length === 0) {
          quotesList.append(item);
        } else {
          quotesList.insertBefore(item, quotesList.firstChild);
        }
      })
      .catch(error => console.log(error));
  });
})()
