Meta Keyword Oluşturma Motoru
=====================
### Gereklilikler
- [UnderscoreJS](http://github.com/jashkenas/underscore)

### Kurulum
Bower kullanarak paket olarak kullanabilirsiniz yada GitRaw üzernden sayfanıza dahil ederek kullanabilirsiniz.

##### Bower ile
```bash
bower install keyword-machine --save
```

##### Manuel
Sıkıştırılmış versiyonu kullanabilirsiniz.
```html
<script src="https://raw.githubusercontent.com/TakaharaShujin/keyword-machine/master/dist/keyword-machine.min.js"></script>
```
yada
```html
<script src="https://raw.githubusercontent.com/TakaharaShujin/keyword-machine/master/dist/keyword-machine.js"></script>
```

### Kullanım Örneği
```javascript
(function(Keymac) {

  // Keyword oluşturma motoru
  var KeywordEngine = new Keymac();

  // Tamlama Balansı (1 - 99 | Default: 10)
  KeywordEngine.balance(18);

  // Sıfat Tanımlama (Label, Priority | Default: 0)
  KeywordEngine.adj("En Kolay", 100);

  // İsim Tanımlama (Label, Priority | Default: 0)
  KeywordEngine.noun("Araç", 100);

  // Oluşturulan keyword listesi
  var odds = KeywordEngine.list();
  console.info('LOG: ', odds);
})(Keymac);

```

### Geliştirme
1. Projeyi forklayın
2. Gereklilikleri yükleyin
3. Geliştirin
4. Paketleyin

```bash
npm install && bower install
grunt dev
```
```bash
grunt build
```

### Geliştiriciler
- Üsame Fethullah AVCI *(Front-end Developer at [Gaaraj.com](http://gaaraj.com))*