<!DOCTYPE html>
<html lang="en-US" class="no-js">
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title></title>
		<meta name="description" content="">
		<meta name="keywords" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
		<link href="/css/bootstrap_custom.css" rel="stylesheet" type="text/css">
		<link href="/css/style.css" rel="stylesheet" type="text/css">
		<link href="/fonts/font-awesome.min.css" rel="stylesheet" type="text/css">
	</head>

	<body class="css-transitions-off waiting">
		<script type='text/javascript'>//<![CDATA[
		document.write("<script async src='//HOST:3000/browser-sync-client.1.1.2.js'><\/script>".replace(/HOST/g, location.hostname));
		//]]></script>
		<!--[if lt IE 8]>
		<p class="viewerror">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/" target="_blank">upgrade your browser</a> to improve your experience.</p>
		<![endif]-->

		<div id="header">
		    <div class="contain">
                <h1>Title</h1>
			</div>
		</div>

		<div id="main">
		    <div class="contain">
				<p>Hello world!</p>
				<div id="vue">
					<ul>
						<li v-for="(item, index) in items">
							{{ item.message }}
						</li>
					</ul>
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
<!--
		<script src="/js/jquery.tablesorter.min-2.26.6.js" type="text/javascript"></script>
		<script src="/js/jquery.tablesorter.widget-filter.min-2.26.6.js" type="text/javascript"></script>
-->
		<script src="/js/custom.js" type="text/javascript"></script>
	</body>
</html>