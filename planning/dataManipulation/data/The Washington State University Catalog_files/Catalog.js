/*global YUI, document, window, getHeader, getFooter, ActiveXObject, XMLHttpRequest, alert */
YUI.namespace("ROWWW.Catalog");
// The following function exists to avoid polluting the global namespace
(function() {
	var catalog = YUI.ROWWW.Catalog, ua = YUI().UA,
		months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	YUI.ROWWW.Catalog.use_ajax = (ua.ie >= 6 || ua.opera >= 8 || ua.gecko >= 1.8 || ua.webkit >= 416);
	
	YUI.ROWWW.Catalog.campus = (function () {
		//var reOld = /http:\/\/[\w.]+(?::\d+)?\/(Pullman|Spokane|Vancouver|Tri-Cities|DDP|General)\/?/i;
		var re = /https:\/\/[\w.]+(?::\d+)?\/(?:\w+\/)?(Pullman|Spokane|Vancouver|Tri-Cities|DDP|Everett|General)\/?/i;
		if (re.test(window.location)) {
			return re.exec(window.location)[1];
		} else {
			return "General";
		}
	}());
	
	YUI().use('node', function (Y) {
		var header = Y.one('#subheader'),
			current_size = 1.65;
		while (header.getStyle('clientHeight') > 45) {
			current_size = current_size - 0.05;
			header.setStyle('fontSize',current_size + 'em');
		}
	});
	
    catalog.base_url = window.baseURL + catalog.campus;

	catalog.termName = function (termNumber) {
		switch (termNumber) {
			case 1:
				return "Spring";
			case 2:
				return "Summer";
			case 3:
				return "Fall";
			default:
				return "Unknown";
		}
	};

	catalog.renderDate = function(date) {
		return [days[date.getDay()], ", ", months[date.getMonth()], " ", date.getDate(), ", ", date.getFullYear()].join("");
	};

	catalog.prefixEncoder = function(pfx) {
		return pfx.replace(/^\s*([\s\S]*\S)?\s*$/, "$1").replace(/ /g , '_').replace(/\//g, '-').replace(/&/g, '^').replace(/,/g, '.');
	};
}());
YUI().use('node', function (Y) {
	var catalog = YUI.ROWWW.Catalog,
		identifiers = {
		"Pullman": "https://images.wsu.edu/javascripts/wsuidentifierV2.js",
		"Vancouver": "https://www.catalog.wsu.edu/Catalog/js/wsuvaidentifierV2.js",
		"Spokane": "https://images.wsu.edu/javascripts/wsusidentifierV2.js",
		"Tri-Cities": "https://images.wsu.edu/javascripts/wsutcidentifierV2.js",
		"DDP": "https://images.wsu.edu/javascripts/wsuidentifierV2.js",
		"General": "https://images.wsu.edu/javascripts/wsuidentifierV2.js"
	};
	if (identifiers[catalog.campus]) {
		Y.Get.script(identifiers[catalog.campus], 
		{
			onSuccess: function(o) {
				if (typeof getHeader === "function") { Y.one('#wsuheader-wrapper').setContent(getHeader()); }
				if (typeof getFooter === "function") { Y.one('#wsufooter-wrapper').setContent(getFooter()); }
			}
		});
	}
});

YUI().use('node', 'io', 'json', function (Y) {
	var permalink = Y.Node.create("<a href='" + Y.config.win.location + "' title='Permalink to this page.'>Permalink</a>");
	var permali = Y.Node.create("<li></li>");
	permali.appendChild(permalink);
	var catalog = YUI.ROWWW.Catalog;
	catalog.permalink = permalink;
	catalog.permali = permali;
	Y.one('#toolbar ul').insert(permali);

	Y.Node.prototype.wrapInner = function (html) {
		var n = Y.Node.create(html);
		this.setData('preWrappedContent', this.getContent());
		n.prepend(this.getContent());
		this.setContent(n);
		return this;
	};

	Y.io(window.origin + window.baseURL + "API/ValidCampuses", {
		on: {
			success: function (id, resp) {
				var campuses;
				try {
					campuses = Y.JSON.parse(resp.responseText);
				} catch (e) {
					Y.log("Error parsing campus array", e);
					return;
				}
				Y.use('node-menunav', function () {
					var toolbar = Y.one('#toolbar'), list,
						itemTemplate = "<li class='yui3-menuitem'><a class='yui3-menuitem-content' href={link}>{text}</a></li>",
						controllerRE = /https:\/\/[\w.]+(?::\d+)?\/(?:\w+\/)?(?:Pullman|Spokane|Vancouver|Tri-Cities|DDP|Everett|General)?\/?(\w+)?/i,
						controller = controllerRE.test(window.location) 
							? (controllerRE.exec(window.location)[1] != undefined 
								? controllerRE.exec(window.location)[1] 
								: "Home") 
							: "Home";
						//controller = Y.config.win.location.pathname.replace(catalog.campus, '').replace(/^\/+/, '').split('/')[0] || "Home";
					toolbar.addClass('yui3-menu').addClass('yui3-menu-horizontal');
					toolbar.wrapInner("<div class='yui3-menu-content' />");
					toolbar.one("ul").addClass("first-of-type");
					toolbar.all('li').each(function (menuItem) {
						menuItem.addClass("yui3-menuitem");
						menuItem.one("a").addClass("yui3-menuitem-content");
					});
					chCampusLink = toolbar.one('#chCampus');
					chCampusLink.set('href', '#').removeClass("yui3-menuitem-content").addClass('yui3-menu-label');
					chCampusLink.ancestor().append("<div id='chCampusMenu' class='yui3-menu'><div class='yui3-menu-content'><ul class='first-of-type'></ul></div></div>").removeClass('yui3-menuitem');
					list = toolbar.one('#chCampusMenu .first-of-type');
					Y.Array.each(campuses, function (campus) {
						list.append(Y.Lang.sub(itemTemplate, { text: campus, link: window.baseURL + campus + "/" + controller }));
					});
					toolbar.plug(Y.Plugin.NodeMenuNav);
					// This is not ideal, but I'm not sure exactly why the text-align directive is being ignored.
					toolbar.one('.yui3-menu-content').setStyle('marginLeft', '49em');
				});
			}
		}
	});
});

YUI().use('node', function (Y) {
	// Academic Unit Selector
	var unitInfo = Y.one('#unit-info'), selector = Y.one('select[name=AU_ID]'), catalog = YUI.ROWWW.Catalog,
		loadingImage;
	if (unitInfo !== null) {
		loadingImage = Y.Node.create("<img alt='Loading...' src='" + window.origin + window.baseURL + "/Content/ajax-loader.gif' />");
		selector.on("change", function (e) {
			selector.set('disabled', true);
			window.location = catalog.base_url + "/Academics/Info/" + selector.get('value');
			unitInfo.setContent('');
			unitInfo.append(loadingImage);
		});
		selector.insertBefore("<option>** Select an Academic Unit **</option>", selector.one('*'));
		if (unitInfo.one('p') === null) {
			selector.set('selectedIndex', 0);
		}
		Y.one('.au_selector input[type=submit]').remove();
	}
});

YUI().use('node', function (Y) {
	// Academic Calendar Controller
	var calendar = Y.one('#Academic_Calendar'), catalog = YUI.ROWWW.Catalog,
		calForm = Y.one('#acad_cal_form'), yearTermSelector, tableBody, campusSelector, calendarDataSource,
		header = Y.one('#subheader'),
		loadingRow = Y.Node.create('<tr style="text-align: center;"><td colspan="2"><img src="' + window.origin + window.baseURL + '/Content/ajax-loader.gif" alt="Loading..." /></td></tr>'),
		calendarDataSourceCallbacks = {
			success: function (e) {
				var metaData = e.response.meta, results = e.response.results;
				loadingRow.remove();
				header.setContent(Y.Lang.sub("Academic Calendar for {termName} {year}", {termName: catalog.termName(metaData.term), year: metaData.year}));
				Y.Array.each(results, function (eachValue, index) {
					tableBody.append(Y.substitute("<tr><td class='AcadCal_Description'>{Description}</td><td class='AcadCal_Date' nowrap='nowrap'>{DateTime}</td></tr>", eachValue,
						function(k,v) {
							var date, build = [], am = true, hour;
							if (k === "DateTime") {
								var date = new Date(v);
								build.push(catalog.renderDate(date));
								if (eachValue.TimeIsUsed) {
									build.push("<br />");
									hour = date.getHours();
									if (hour > 12) { 
										am = false;
										hour -= 12;
									} else if (hour === 0) {
										hour = 12;
									}
									build.push(hour); 
									build.push(":"); 
									build.push(("00" + date.getMinutes()).slice(-2)); 
									build.push(":");
									build.push(("00" + date.getSeconds()).slice(-2)); 
									build.push(am ? " AM" : " PM");
								}
								return build.join("");
							} else {
								return v;
							}
						}));
				});
				yearTermSelector.set('disabled', false);
				campusSelector ? campusSelector.set('disabled', false) : null;
				var mappedCampus = metaData.campus === 'All' ? 'General' : metaData.campus;
				var newURL = window.origin + window.baseURL + mappedCampus + "/AcademicCalendar/" + metaData.year + "/" + metaData.term;
				window.history.pushState(null, "Academic Calendar", newURL);
				catalog.permalink.setAttribute('href', newURL);
				Y.one('#toolbar ul').get('children').slice(-1).item(0).remove(true);
				Y.one('#toolbar ul').insert(catalog.permali);
			},
			failure: function (e) {
				var url = catalog.permalink.get('href');
				window.location = url;
				return;
			}
		}, selectChangeHandler = function (e) {
			var value = yearTermSelector.get('value'),
					year = +value.substring(0, 4),
					term = +value[5];
			yearTermSelector.set('disabled', true);
			campusSelector ? campusSelector.set('disabled', true) : null;

			tableBody.empty(true);
			tableBody.append(loadingRow);

			var ajaxURL = Y.substitute("{base}API/CalendarEvents/{campus}/{year}-{term}", { base: window.origin + window.baseURL, campus: catalog.campus, year: year, term: term }, function (key, value) {
				if (key === "campus") {
					if (campusSelector && campusSelector.get('value') !== "ALL") {
						return campusSelector.get('value');
					} else {
						return "General";
					}
				} else {
					return value;
				}
			});
			calendarDataSource.set('source', ajaxURL);
			calendarDataSource.sendRequest({
				callback: calendarDataSourceCallbacks
			});
		};

	if (calForm) {
		Y.use('substitute', 'datasource-io', 'datasource-jsonschema', 'datatype-date', function () {
			yearTermSelector = calForm.one('#YearTermSelector');
			tableBody = Y.one("#Academic_Calendar tbody");
			calendarDataSource = new Y.DataSource.IO();
			calendarDataSource.plug({ fn: Y.Plugin.DataSourceJSONSchema, cfg: {
					schema: {
						resultListLocator: "events",
						resultFields: ["DateTime", "TimeIsUsed", "Description"],
						metaFields: { errors: "errors", campus: "campus", year: "year", term: "term" }
					}
				}
			});
			yearTermSelector.on('change', selectChangeHandler);

			calForm.one('input[value=Select]').remove();

			Y.io(window.origin + window.baseURL + "API/ValidCalendarCampuses", {
				on: {
					success: function (id, response) {
						var campuses, i, campusDefiner = function (key) {
							if (key === "campus") {
								return campuses[i];
							} else if (key === "label") {
								return campuses[i] === "DDP" ? "WSU Online" : campuses[i];
							} else if (key === "selected") {
								var camp = catalog.campus === 'General' ? 'All' : catalog.campus;
								return camp === campuses[i] ? "selected='selected'" : "";
							}
						};
						try {
							campuses = Y.JSON.parse(response.responseText);
						} catch (e) {
							return;
						}
						campusSelector = Y.Node.create("<select name='CampusSelect'></select>");
						for (i = 0; i < campuses.length; i += 1) {
							campusSelector.append(Y.substitute("<option value={campus} {selected}>{label}</option>", {}, campusDefiner));
						}
						campusSelector.on('change', selectChangeHandler);
						calForm.insert(campusSelector, yearTermSelector.next());
					}
				}
			});
		});
	}
});

YUI().use('node', 'selector-css3', function (Y) {
	var form = Y.one('#courses_form'), numbersTextBox,
		prefixSelect,
		gerSelect, prefixSearchSelect,
		searchTextBox,
		catalog = YUI.ROWWW.Catalog,
		SUB = Y.Lang.sub,
		disableForm = function () {
			form.all('input, seelct').set('disabled', true);
		}, enableForm = function () {
			form.all('input, select').set('disabled', false);
		}, validateOnListEntry = function () {
			var numberValues, value = numbersTextBox.get('value'), numericValue, i;
			if (value === '') { return true; }
			// TODO: This should not use alert.
			numberValues = value.split('-');
			if (numberValues.length === 0) {
				alert("Please enter at least one value for the Course Number.");
				return false;
			} else if (numberValues.length > 2) {
				alert("You can only supply two values in the range.");
				return false;
			}
			for (i = 0; i < numberValues.length; i += 1) {
				numericValue = parseInt(numberValues[i], 10);
				if (isNaN(numericValue)) {
					alert(Y.Lang.sub("'{num}' is not a number.", { num: numericValue }));
					return false;
				} else if (numericValue < 1 || numericValue > 999) {
					alert("Values must be between 1 and 999.");
					return false;
				}
				numberValues[i] = numericValue;
			}
			if (numberValues.length === 2) {
				i = "{0}-{1}";
			} else {
				i = "{0}";
			}
			numbersTextBox.set('value', Y.Lang.sub(i, numberValues));
			return true;
		}, prefixValueChange = function (e) {
			disableForm();
			var value = prefixSelect.one(':checked').get('value');
			if (value !== '') {
				window.location = SUB("{0}/Courses/BySubject/{1}", [catalog.base_url, value]);
			}
		}, ucoreChange = function (e) {
			disableForm();
			var value = ucoreSelect.one(':checked').get('value');
			if (value !== '') {
				window.location = SUB("{0}/Courses/ByUCORE/{1}", [catalog.base_url, value]);
			}
		}, gerChange = function (e) {
			disableForm();
			var value = gerSelect.one(':checked').get('text');
			if (value !== '') {
				window.location = SUB("{0}/Courses/ByGER/{1}", [catalog.base_url, value]);
			}
		}, keywordsKeypress = function (e) {
			var key = e.charCode;

			if (key === 13) {
				disableForm();
				window.location = SUB("{0}/Courses/BySearch/{1}", [catalog.base_url, e.target.get('value').replace(/ /g, '_')]);
			}
		}, listKeypress = function (e) {
			var key = e.charCode;

			if (key === 13) {
				disableForm();
				if (validateOnListEntry()) {
					window.location = SUB("{0}/Courses/ByList/{1}/{2}", [catalog.base_url, catalog.prefixEncoder(prefixSearchSelect.one(":checked").get('value')), numbersTextBox.get('value')]);
				} else {
					enableForm();
				}
			}
		};
	if (form !== null) {
		numbersTextBox = form.one("#numbers");
		prefixSelect = form.one("#subjects_list");
		ucoreSelect = form.one("#ucores");
		gerSelect = form.one("#gercodes");
		prefixSearchSelect = form.one("#subjects_search");
		searchTextBox = form.one("#keywords");

		form.all('input[type=submit]').remove();
		prefixSelect.insertBefore("<option />", prefixSelect.one('*'));
		prefixSelect.set('selectedIndex', 0);
		ucoreSelect.insertBefore("<option />", ucoreSelect.one('*'));
		ucoreSelect.set('selectedIndex', 0);
		gerSelect.insertBefore("<option />", gerSelect.one('*'));
		gerSelect.set('selectedIndex', 0);

		prefixSelect.on('change', prefixValueChange);
		ucoreSelect.on('change', ucoreChange);
		gerSelect.on('change', gerChange);

		searchTextBox.on('keyup', keywordsKeypress);
		numbersTextBox.on('keyup', listKeypress);
	}
});
