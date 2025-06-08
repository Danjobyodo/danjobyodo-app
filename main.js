// DOMが完全に読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
    // --- 状態の初期化 ---
    if (localStorage.getItem('byodo1') === null) {
        localStorage.setItem('byodo1', 'false');
    }
    if (localStorage.getItem('byodoCount') === null) {
        localStorage.setItem('byodoCount', '1');
    }

    // --- 男女平等1 (page1.html) の処理 ---
    const byodoSwitch = document.getElementById('byodo-switch');
    const byodoText = document.getElementById('byodo-text');

    if (byodoSwitch && byodoText) {
        const currentState = localStorage.getItem('byodo1') === 'true';
        byodoSwitch.checked = currentState;
        byodoText.textContent = currentState ? '男女平等' : '';

        byodoSwitch.addEventListener('change', (event) => {
            const newState = event.target.checked;
            localStorage.setItem('byodo1', newState);
            byodoText.textContent = newState ? '男女平等' : '';
        });
    }

    // --- 男女平等2 (page2.html) の処理 ---
    const byodoList = document.getElementById('byodo-list');
    const addBtn = document.getElementById('add-btn');
    const resetBtn = document.getElementById('reset-btn');

    function renderByodoList() {
        if (!byodoList) return;
        byodoList.innerHTML = '';
        const count = parseInt(localStorage.getItem('byodoCount'), 10);
        for (let i = 1; i < count; i++) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `/danjobyodo-app/detail.html?item=${i}`; // パスを修正
            a.textContent = `男女平等${i}`;
            li.appendChild(a);
            byodoList.appendChild(li);
        }
    }
    
    if (byodoList) {
        renderByodoList();
    }

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            let count = parseInt(localStorage.getItem('byodoCount'), 10);
            count++;
            localStorage.setItem('byodoCount', count);
            renderByodoList();
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (window.confirm('本当にリセットしますか？')) {
                localStorage.setItem('byodoCount', '1');
                renderByodoList();
            }
        });
    }
    
    // --- 詳細ページ (detail.html) の処理 ---
    const detailTitle = document.getElementById('detail-title');
    const detailText = document.getElementById('detail-text');
    if(detailTitle && detailText) {
        const params = new URLSearchParams(window.location.search);
        const itemNumber = params.get('item');
        if(itemNumber) {
            const textContent = `${itemNumber}番目の男女平等`;
            detailTitle.textContent = textContent;
            detailText.textContent = textContent;
        }
    }

    // --- キーボードショートカット (全ページ共通) ---
    document.addEventListener('keydown', (e) => {
        if (e.metaKey || e.ctrlKey) { 
            let handled = true;
            switch (e.key) {
                case '1':
                    window.location.href = '/danjobyodo-app/page1.html'; // パスを修正
                    break;
                case '2':
                    window.location.href = '/danjobyodo-app/page2.html'; // パスを修正
                    break;
                case 'e':
                    if(byodoSwitch) byodoSwitch.click();
                    break;
                case 'a':
                    if(addBtn) addBtn.click();
                    break;
                case 'r':
                     if(resetBtn) resetBtn.click();
                    break;
                default:
                    handled = false;
            }
            if (handled) {
                e.preventDefault();
            }
        }
    });
});
