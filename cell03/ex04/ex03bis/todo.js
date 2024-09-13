let numbering = 0;

$('#New').click(function() {
  const name = prompt("Please enter your list:", "");
  if (name == null || name.trim() === '') {
    alert("Invalid input");
    return;
  }
  numbering++;
  setCookie(numbering.toString(), name, 365);  
  appending(name);
});

function appending(name) {
  const todo_div = $('<div></div>')
      .text(name)
      .attr('id', numbering)
      .attr('class', "todo-item");
  $('#ft_list').prepend(todo_div);
}

function setCookie(cname, cvalue, exdays) {
  const expDate = new Date();
  expDate.setTime(expDate.getTime() + (exdays * 24 * 60 * 60 * 1000));
  document.cookie = `${cname}=${encodeURIComponent(cvalue)}; expires=${expDate.toUTCString()}; path=/`;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

$('#ft_list').on('click', '.todo-item', function() {
  if (confirm("Do you want to delete?")) {
    deleteCookie(this.id);
    $(this).remove();
    numbering--;
  }
});

$(window).on("load", function() {
  numbering = 0;
  const cookies = document.cookie.split('; ').filter(row => row.includes('='));
  cookies.forEach(cookie => {
    const [key, value] = cookie.split('=');
    if (key && value) {
      numbering++;
      appending(decodeURIComponent(value));
    }
  });
});
