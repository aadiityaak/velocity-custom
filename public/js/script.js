/*!
  *  v1.0.21 ({REPLACE_ME_URL})
  * Copyright 2013-2024 {REPLACE_ME_AUTHOR}
  * Licensed under GPL (http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
  */
(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
})((function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var lockr = {exports: {}};

	(function (module, exports) {
		(function (root, factory) {
		  {
		    if (module.exports) {
		      exports = module.exports = factory(root, exports);
		    }
		  }
		})(commonjsGlobal, function (root, Lockr) {

		  if (!Array.prototype.indexOf) {
		    Array.prototype.indexOf = function (elt /*, from*/) {
		      var len = this.length >>> 0;
		      var from = Number(arguments[1]) || 0;
		      from = from < 0 ? Math.ceil(from) : Math.floor(from);
		      if (from < 0) from += len;
		      for (; from < len; from++) {
		        if (from in this && this[from] === elt) return from;
		      }
		      return -1;
		    };
		  }
		  Lockr.prefix = "";
		  Lockr._getPrefixedKey = function (key, options) {
		    options = options || {};
		    if (options.noPrefix) {
		      return key;
		    } else {
		      return this.prefix + key;
		    }
		  };
		  Lockr.set = function (key, value, options) {
		    var query_key = this._getPrefixedKey(key, options);
		    try {
		      localStorage.setItem(query_key, JSON.stringify({
		        "data": value
		      }));
		    } catch (e) {
		      if (console) console.warn("Lockr didn't successfully save the '{" + key + ": " + value + "}' pair, because the localStorage is full.");
		    }
		  };
		  Lockr.get = function (key, missing, options) {
		    var query_key = this._getPrefixedKey(key, options),
		      value;
		    try {
		      value = JSON.parse(localStorage.getItem(query_key));
		    } catch (e) {
		      if (localStorage[query_key]) {
		        value = {
		          data: localStorage.getItem(query_key)
		        };
		      } else {
		        value = null;
		      }
		    }
		    if (!value) {
		      return missing;
		    } else if (typeof value === 'object' && typeof value.data !== 'undefined') {
		      return value.data;
		    }
		  };
		  Lockr.sadd = function (key, value, options) {
		    var query_key = this._getPrefixedKey(key, options),
		      json;
		    var values = Lockr.smembers(key);
		    if (values.indexOf(value) > -1) {
		      return null;
		    }
		    try {
		      values.push(value);
		      json = JSON.stringify({
		        "data": values
		      });
		      localStorage.setItem(query_key, json);
		    } catch (e) {
		      console.log(e);
		      if (console) console.warn("Lockr didn't successfully add the " + value + " to " + key + " set, because the localStorage is full.");
		    }
		  };
		  Lockr.smembers = function (key, options) {
		    var query_key = this._getPrefixedKey(key, options),
		      value;
		    try {
		      value = JSON.parse(localStorage.getItem(query_key));
		    } catch (e) {
		      value = null;
		    }
		    return value && value.data ? value.data : [];
		  };
		  Lockr.sismember = function (key, value, options) {
		    return Lockr.smembers(key).indexOf(value) > -1;
		  };
		  Lockr.keys = function () {
		    var keys = [];
		    var allKeys = Object.keys(localStorage);
		    if (Lockr.prefix.length === 0) {
		      return allKeys;
		    }
		    allKeys.forEach(function (key) {
		      if (key.indexOf(Lockr.prefix) !== -1) {
		        keys.push(key.replace(Lockr.prefix, ''));
		      }
		    });
		    return keys;
		  };
		  Lockr.getAll = function (includeKeys) {
		    var keys = Lockr.keys();
		    if (includeKeys) {
		      return keys.reduce(function (accum, key) {
		        var tempObj = {};
		        tempObj[key] = Lockr.get(key);
		        accum.push(tempObj);
		        return accum;
		      }, []);
		    }
		    return keys.map(function (key) {
		      return Lockr.get(key);
		    });
		  };
		  Lockr.srem = function (key, value, options) {
		    var query_key = this._getPrefixedKey(key, options),
		      json,
		      index;
		    var values = Lockr.smembers(key, value);
		    index = values.indexOf(value);
		    if (index > -1) values.splice(index, 1);
		    json = JSON.stringify({
		      "data": values
		    });
		    try {
		      localStorage.setItem(query_key, json);
		    } catch (e) {
		      if (console) console.warn("Lockr couldn't remove the " + value + " from the set " + key);
		    }
		  };
		  Lockr.rm = function (key) {
		    var queryKey = this._getPrefixedKey(key);
		    localStorage.removeItem(queryKey);
		  };
		  Lockr.flush = function () {
		    if (Lockr.prefix.length) {
		      Lockr.keys().forEach(function (key) {
		        localStorage.removeItem(Lockr._getPrefixedKey(key));
		      });
		    } else {
		      localStorage.clear();
		    }
		  };
		  return Lockr;
		});
	} (lockr, lockr.exports));

	/*!
	 *  v1.0.2 (https://velocitydeveloper.com)
	 * Copyright 2013-2024 Velocity Developer
	 * Licensed under GPL (http://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)
	 */
	(function ($) {
	  // Inisialisasi chained untuk elemen select saat dokumen siap
	  $(document).ready(function () {
	    // jika elemen #cp_city ada, jalankan fungsi chained
	    if ($("#cp_city").length) {
	      $("#cp_city").chained("#cp_province");
	    }
	    if ($("#cp_district").length) {
	      $("#cp_district").chained("#cp_city");
	    }
	  });
	})(jQuery);
	document.addEventListener("DOMContentLoaded", function () {
	  // Fungsi untuk memeriksa dan fetch data jika belum ada di local storage
	  function fetchDataIfNotExists(storageKey, url) {
	    if (!Lockr.get(storageKey)) {
	      fetch(url).then(response => {
	        if (!response.ok) {
	          throw new Error("Network response was not ok " + response.statusText);
	        }
	        return response.json();
	      }).then(data => {
	        Lockr.set(storageKey, data);
	        // console.log(
	        //   `Data berhasil disimpan ke local storage dengan kunci: ${storageKey}`
	        // );
	      }).catch(error => console.error(`Error fetching ${storageKey} data:`, error));
	    }
	  }

	  // Memeriksa dan fetch data jika belum ada di local storage
	  fetchDataIfNotExists("stateData", customPluginData.jsonState);
	  fetchDataIfNotExists("cityData", customPluginData.jsonCity);
	  fetchDataIfNotExists("districtData", customPluginData.jsonDistrict);
	  function removeEmptyOption(selectElement) {
	    const options = selectElement.options;
	    for (let i = options.length - 1; i >= 0; i--) {
	      if (options[i].value === "") {
	        selectElement.remove(i);
	      }
	    }
	  }
	  // Fungsi untuk mengisi elemen <select> dengan data dari local storage
	  function populateSelect(elementId, localStorageKey) {
	    const selectElement = document.getElementById(elementId);
	    if (selectElement) {
	      removeEmptyOption(selectElement);
	      const currentValue = selectElement.getAttribute("data-current");
	      const data = Lockr.get(localStorageKey);
	      if (data) {
	        data.forEach(item => {
	          const option = document.createElement("option");
	          option.value = item.value || item.label;
	          if (item.value === currentValue) {
	            option.setAttribute("selected", "selected");
	          }
	          if (item.city_id) {
	            option.setAttribute("data-child", item.city_id);
	            option.textContent = item.value;
	          } else if (item.state) {
	            option.setAttribute("data-child", item.state);
	            option.setAttribute("data-parent", item.id);
	            option.textContent = item.value;
	          } else {
	            option.setAttribute("data-parent", item.value);
	            option.textContent = item.label;
	          }
	          selectElement.appendChild(option);
	        });
	        // Trigger the chained function to update
	        jQuery(selectElement).trigger("change");
	      }
	    }
	  }

	  // Panggil fungsi untuk mengisi elemen <select> dengan data provinsi dan kota
	  populateSelect("cp_province", "stateData");
	  populateSelect("cp_city", "cityData");
	  populateSelect("cp_district", "districtData");
	});

}));
//# sourceMappingURL=script.js.map
