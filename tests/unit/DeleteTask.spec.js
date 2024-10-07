import { mount } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'
import { nextTick } from 'vue'

describe('TaskItem.vue', () => {
  it('émet l\'événement remove-task et affiche la confirmation lors de la suppression', async () => {
    const task = { id: 1, title: 'Tâche test', completed: false }
    const wrapper = mount(TaskItem, {
      props: { task },
      global: {
        stubs: ['Icon', 'PopupNotification']
      }
    })

    // Simuler la confirmation de l'utilisateur
    jest.spyOn(window, 'confirm').mockImplementation(() => true)

    // Trouver et cliquer sur le bouton de suppression
    const deleteButton = wrapper.find('button.text-red-500')
    await deleteButton.trigger('click')

    // Vérifier que l'événement remove-task a été émis avec l'ID de la tâche
    expect(wrapper.emitted('remove-task')).toBeTruthy()
    expect(wrapper.emitted('remove-task')[0]).toEqual([1])

    // Vérifier que la confirmation de suppression est affichée
    await nextTick()
    expect(wrapper.vm.showDeleteConfirmation).toBe(true)

    // Vérifier que le composant PopupNotification est rendu
    expect(wrapper.findComponent({ name: 'PopupNotification' }).exists()).toBe(true)

    // Simuler la fermeture de la notification
    await wrapper.vm.closeDeleteConfirmation()

    // Vérifier que la confirmation de suppression est cachée
    expect(wrapper.vm.showDeleteConfirmation).toBe(false)
  })
})
