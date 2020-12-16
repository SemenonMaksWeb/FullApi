import { ref, onUnmounted, onMounted } from 'vue';

export function ToggleBody(Toggle = false, target: string) {
  const ToggleBody = ref(Toggle);
  const ToggleBodyFunction = (event: { target: any }) => {
    ToggleBody.value =
      target === event.target.className && ToggleBody.value === false;
  };
  const SetBody = () => {
    document.addEventListener('click', ToggleBodyFunction);
  };
  const DeleteBody = () => {
    document.removeEventListener('click', ToggleBodyFunction);
  };
  onUnmounted(DeleteBody);
  onMounted(SetBody);
  return { ToggleBody };
}
