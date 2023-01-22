const storageKey = 'theme-preference'

const getColorPreference = () => {
  if (localStorage.getItem(storageKey)) return localStorage.getItem(storageKey)
  else
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
}

const setPreference = () => {
  localStorage.setItem(storageKey, theme.value)
  
  reflectPreference()
}

const reflectPreference = () => {
  document.firstElementChild.setAttribute('data-theme', theme.value)

  document
    .querySelector('#theme-toggle')
    ?.setAttribute('aria-label', theme.value)

  let radion = document.querySelector(`#theme-toggle input[value="${theme.value}"]`)
}

const theme = {
  value: getColorPreference(),
}

reflectPreference()

window.onload = () => {
  // set on load so screen readers can get the latest value on the button
  reflectPreference()
  
  // now this script can find and listen for clicks on the control
  document.querySelectorAll('#theme-toggle input[type="radio"]').forEach(button => {
    button.addEventListener('click', (e) => {
      theme.value = e.target.value;
      console.log(theme.value);
      setPreference()
    })
  })
}

// window
//   .matchMedia('(prefers-color-scheme: dark)')
//   .addEventListener('change', ({ matches: isDark }) => {
//     theme.value = isDark ? 'dark' : 'light'
//     setPreference()
//   })
