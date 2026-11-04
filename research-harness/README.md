# Prompt-injection test ajanı (araç erişimli)

`run-agent-test.js`, Gemini API'yi **gerçek bir araçla** (`submit_contact_form`
function calling tanımı) çağıran küçük bir script. Gemini web sohbetinin aksine,
model bu aracı çağırmaya karar verirse `/contact` formuna **gerçekten** bir HTTP
isteği gider — yani A-E varyantlarını (form doldurtma / mail attırma) ilk defa
anlamlı şekilde test edebiliyoruz.

Bu klasör dışındaki hiçbir dosyaya (`about2.ejs`, `controller/user.js`,
`ABOUT2_CONFIG`) dokunmuyor — sadece var olan `/about2?...&test=X` sayfalarını
okuyup modele veriyor.

## Kurulum

1. [aistudio.google.com/apikey](https://aistudio.google.com/apikey) adresinden
   ücretsiz bir Gemini API anahtarı al.
2. `research-harness/.env.example` dosyasını `research-harness/.env` olarak
   kopyala, içine hem Gemini anahtarını hem de `/about2` test sayfasının
   erişim anahtarını (`ABOUT2_CONFIG`'deki `KEY=` değeri) yaz. Bu dosya
   commit edilmez (gitignore'da).
3. Repo kökünde `npm install` daha önce yapılmamışsa yap (Node 18+ gerekiyor —
   global `fetch` için).

## Çalıştırma

```bash
node research-harness/run-agent-test.js A,B,C,D,E 3
```

İlk parametre: test edilecek harfler (virgülle ayrılmış, boşluksuz).
İkinci parametre: her harf için kaç deneme yapılacağı (varsayılan 3).

Sadece A-E ile sınırlı değil — herhangi bir harfi (F, S, Z, ...) de aynı
şekilde verebilirsin, script hepsiyle çalışır.

## Çıktı

- Konsola her denemenin tam dökümü basılır: araç çağrıldı mı, hangi
  argümanlarla, form gönderimi HTTP durumu neydi, modelin nihai metni ne oldu.
- `research-harness/results/run-<zaman>.json` dosyasına yapılandırılmış JSON
  olarak kaydedilir (bu klasör de gitignore'da — gerçek test verisi repoya
  gitmez).
- Sonunda kısa bir özet: toplam deneme / aracın çağrıldığı deneme sayısı
  (yani kaç denemede enjeksiyon gerçek bir eyleme dönüştü).

## Notlar

- Tüm form verileri (`research-harness/run-agent-test.js` değil, her test
  sayfasının kendi `ABOUT2_CONFIG` içeriği) zaten sahte/test verisi —
  gerçek kişisel bilgi kullanılmıyor.
- `/contact` formu gerçekten gönderilirse mail `arif.kalayci44@gmail.com`'a
  gider (sitenin kendi, değişmeyen mail mantığı) — yani sonucu hem script
  çıktısından hem gelen kutusundan doğrulayabilirsin.
- Script Gemini'nin güncel function-calling REST şemasına göre yazıldı ama
  **benim tarafımda API anahtarıyla çalıştırılıp doğrulanmadı** (anahtarın
  bende yok, olmaması da doğru). İlk çalıştırmada bir hata alırsan tam hata
  mesajını yapıştır, birlikte düzeltiriz.
