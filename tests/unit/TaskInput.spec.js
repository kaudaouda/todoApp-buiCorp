import { mount } from '@vue/test-utils'
import TaskInput from '@/components/TaskInput.vue'


describe('TaskInput', () => {
  test('Le composant se monte correctement', () => {
    const wrapper = mount(TaskInput)
    expect(wrapper.exists()).toBe(true)
  })

  test('Le champ de saisie existe', () => {
    const wrapper = mount(TaskInput)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  test('La saisie met à jour la valeur du champ', async () => {
    const wrapper = mount(TaskInput)
    const input = wrapper.find('input')
    await input.setValue('Nouvelle tâche')
    expect(input.element.value).toBe('Nouvelle tâche')
  })

  test('Soumettre le formulaire émet un événement avec la nouvelle tâche', async () => {
    const wrapper = mount(TaskInput)
    const input = wrapper.find('input')
    await input.setValue('Nouvelle tâche')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.emitted('add-task')).toBeTruthy()
    expect(wrapper.emitted('add-task')[0]).toEqual(['Nouvelle tâche'])
  })

  test('Le champ se vide après la soumission', async () => {
    const wrapper = mount(TaskInput)
    const input = wrapper.find('input')
    await input.setValue('Nouvelle tâche')
    await wrapper.find('form').trigger('submit')
    expect(input.element.value).toBe('')
  })
})