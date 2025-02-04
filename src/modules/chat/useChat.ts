import {ref, nextTick} from 'vue';
import socket from "@/plugins/socket";
import {debounce} from 'lodash';
import {useRoute} from "vue-router";

export function useChat() {
    const route = useRoute()

    const isLoading = ref(false);
    const currentPage = ref(1);

    const connectSocketConnection = () => {
        cleanupSocketConnections();

        socket.emit('joinRoom', route.params.id);
        socket.emit('get_messages', {messageCode: route.params.id, page: currentPage.value});
        socket.emit('get_latest_messages',{ messageCode: route.params.id, page : 1, limit : 20 });//guncellemelri dinler
    };

    const cleanupSocketConnections = () => {
        socket.off('messages');
        socket.off('new_message');
        socket.off('roomJoined');
        socket.off('connect_error');
        socket.off('latest_messages');//guncellemeler
    }

    const scrollToEnd = async () => {
        await nextTick();

        const contentRoot = document.getElementById('chat-history');
        if (!contentRoot) return;

        const observer = new MutationObserver(() => {
            contentRoot.scrollIntoView({behavior: 'smooth', block: 'end'});
            observer.disconnect();
        });

        observer.observe(contentRoot, {childList: true, subtree: true});
    };

    // Yukarı kaydır ve eski mesajları yukle
    const handleScroll = debounce((event) => {
        console.log("handleScroll");
        const chatContainer = event.target;
        if (chatContainer.scrollTop === 0 && !isLoading.value) {
            isLoading.value = true;
            currentPage.value++;
            socket.emit('get_messages', { messageCode: route.params.id, page: currentPage.value }, () => {
                console.log("done")
             });

            // Gelen mesajları dinle ve yükleme durumunu sıfırla
            socket.on('messages', (messages) => {
                console.log("Yeni mesajlar geldi:", messages);
                isLoading.value = false;
            });
        }
    }, 200);

    return {
        isLoading,
        currentPage,
        scrollToEnd,
        handleScroll,
        cleanupSocketConnections,
        connectSocketConnection,
    };
}
