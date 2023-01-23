window.addEventListener("load", solve);

function solve() {
	// get elements
	const input = {
		title: document.getElementById('post-title'),
		category: document.getElementById('post-category'),
		content: document.getElementById('post-content')
	}

	document.getElementById('publish-btn').addEventListener('click', publish);

	function publish(event) {
		event.preventDefault();
		const title = input.title.value;
		const category = input.category.value;
		const content = input.content.value;

		// validate input fileds
		if (input.title.value == '' || input.category.value == '' || input.content.value == '') {
			return;
		}

		// if all input is valid create new elements in ul with id "review-list"
		const li = document.createElement('li');
		li.className = 'rpost';
		li.innerHTML = `<article>
		<h4>${title}</h4>
		<p>Category: ${category}</p>
		<p>Content: ${content}</p>
		</article>
		<button class='action-btn edit'>Edit</button>
		<button class='action-btn approve'>Approve</button>`;

		document.getElementById('review-list').appendChild(li);

		// clear input fields
		input.title.value = '';
		input.category.value = '';
		input.content.value = ''

		const approveButton = li.getElementsByClassName('action-btn approve')[0];
		const edintButton = li.getElementsByClassName('action-btn edit')[0];
		edintButton.addEventListener('click', editBtn);
		approveButton.addEventListener('click', approveBtn);

		function editBtn(ev) {
			// if edit button is clicked - send back the information to the input fields
			input.title.value = title;
			input.category.value = category;
			input.content.value = content;

			// clean the elements from ul with id ="review-list"
			li.remove();
		}

		function approveBtn(e) {
			// if approve btn is clicked -> delete elements from ul id "review-list"
			// and moove them to ul id "published-list"
			document.getElementById('published-list').appendChild(li);
			edintButton.remove();
			approveButton.remove();
		}
	}
	// when click clear button all records for all post must be deleted
	document.getElementById('clear-btn').addEventListener('click', clearBtn);

	function clearBtn(myEv) {
		document.getElementById('published-list').innerHTML = '';
	}
}
