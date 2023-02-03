# Drop-in html differ

Usage:

```
<script>
    const original_file_url = "old_site_url/old_site.html";
</script>
<script data-main="path_to_scripts/differ.js" src="path_to_require.js/require.js"/>
```

Place `differ.js` and `htmldiff.js` in the same directory

Requires `require.js`, which you can obtain [here](https://requirejs.org/docs/download.html)

To customize appearance of inserted and deleted elements, use the following CSS:

```
ins.diff-change {
  background-color: #ffff00;
  border-style: dotted;
  border-width: 1px;
}
del.diff-change {
  background-color: #ffff00;
  border-style: dotted;
  border-width: 1px;
}
```
