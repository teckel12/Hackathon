<!DOCTYPE html>
<html lang="en-US" class="no-js">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title></title>
		<meta name="description" content="">
		<meta name="keywords" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
		<link href="/css/style.css" rel="stylesheet" type="text/css">
		<link href="/fonts/font-awesome.min.css" rel="stylesheet" type="text/css">
	</head>

	<body class="waiting">
		<?php if ($_SERVER["HTTP_HOST"] == '127.0.0.111') : ?>
			<script type='text/javascript'>//<![CDATA[
			document.write("<script async src='//HOST:3000/browser-sync-client.1.1.2.js'><\/script>".replace(/HOST/g, location.hostname));
			//]]></script>
		<?php endif; ?>
		<div id="header">
		    <div class="contain">
				<h1>Todo List w/Markdown</h1>
			</div>
		</div>

		<div id="main">
		    <div class="contain">
				<button id="closeAll" title="Close all"><i class="fa fa-chevron-up"></i></button>
				<button id="dueSort" title="Sort by due date"><i class="fa fa-sort-amount-asc" aria-hidden="true"></i> Due Sort</button>
				<button id="titleSort" title="Sort by title"><i class="fa fa-sort-alpha-asc" aria-hidden="true"></i> Title Sort</button>
				<div id="vue">
					<div id="todo">
						<div v-for="(item, index) in todo">
							<div class="title">
								<i class="fa fa-chevron-down expand" v-on:click="expand()"></i>
								<span>Due:</span><input type="date" v-model="item.timestamp" v-on:change="save()" v-bind:class="'' + (item.timestamp == today() ? 'due' : '') + (item.timestamp < today() ? 'pastDue' : '')">
								<span>Title:</span><input type="text" v-model="item.title" v-on:change="save()">
								<i class="fa fa-trash delete" v-on:click="remove(index, item.title)"></i>
							</div>
							<div class="content">
								<textarea v-model="item.content" v-on:change="save()" v-on:keyup="keyup()"></textarea>
								<div class="markdown"></div>
							</div>
						</div>
					</div>
					<div class="add">
						<i class="fa fa-plus" v-on:click="add()"></i>
					</div>
				</div>
			</div>
		</div>

		<div id="footer">
		    <div class="contain">
			</div>
		</div>

		<div id="popupModal">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-body">
						<div class="modal-copy"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="waiting"><i class="fa fa-spinner fa-spin fa-fw"></i></div>
		<div id="toast"></div>

		<script src="/js/jquery-3.0.0.min.js" type="text/javascript"></script>
		<script src="/js/vue-2.0.1.min.js"></script>
		<script src="/js/custom.js" type="text/javascript"></script>
		<script src="/js/showdown.min.js" type="text/javascript"></script>
	</body>
</html>