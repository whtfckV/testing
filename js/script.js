(() => {
  const quotesList = document.querySelector('#quotes-from-others');
  const btnNewQuote = document.querySelector('#btnNewQuote');

  btnNewQuote.addEventListener('click', () => {
    const url = 'http://localhost:3000';

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const quoteTitle = document.createElement('div');
        const quoteAuthor = document.createElement('div');
        const quote = document.createElement('li');

        quoteTitle.classList.add('quote__title');
        quoteAuthor.classList.add('quote__author');
        quote.append(quoteTitle, quoteAuthor);

        quoteTitle.textContent = data.quoteText;
        quoteAuthor.innerHTML = `&copy; ${data.quoteAuthor || 'Неивестный автор'}`;

        if (quotesList.children.length === 0) {
          quotesList.append(quote);
        } else {
          quotesList.insertBefore(quote, quotesList.firstChild);
        }
      })
      .catch(error => console.log(error));
  });
})()
