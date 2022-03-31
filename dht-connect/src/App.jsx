import logo from './logo.svg';
import styles from './App.module.css';

import './connect.browser';
import { onMount } from 'solid-js';

function App() {
  onMount(() => {
    let socket = connect('test-channel');
  });

  return (
    <div class="flex flex-col w-screen h-screen bg-gray-200">
      <div class="w-screen h-15">Hello</div>
      <iframe
        id="response"
        class="w-full h-full"
        sandbox="allow-top-navigation allow-scripts allow-forms"
      ></iframe>
    </div>
  );
}

export default App;
