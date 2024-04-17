(() => {
  const quotesList = document.querySelector('#quotes-from-others');
  const btnNewQuote = document.querySelector('#btnNewQuote');

  btnNewQuote.addEventListener('click', () => {
    const url = 'http://localhost:3001';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const quote = document.createElement('figure');
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
