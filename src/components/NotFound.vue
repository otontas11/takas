<template>
  <div class="not-found">
    <h1>404 - Sayfa Bulunamadı</h1>
    <p>Üzgünüz, aradığınız sayfa bulunamadı.</p>
    <router-link to="/">Ana Sayfaya Dön</router-link>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}

.not-found h1 {
  font-size: 3rem;
  color: #ff6347;
}

.not-found p {
  font-size: 1.2rem;
  margin-top: 10px;
}

.not-found a {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}

.not-found a:hover {
  background-color: #0056b3;
}
</style>
