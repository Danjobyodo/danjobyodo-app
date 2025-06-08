// DOMが完全に読み込まれたら実行
document.addEventListener('DOMContentLoaded', () => {
    // --- 状態の初期化 ---
    // localStorageに値がなければ、初期値を設定
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
        // 状態を読み込んでスイッチとテキストに反映
        const currentState = localStorage.getItem('byodo1') === 'true';
        byodoSwitch.checked = currentState;
        byodoText.textContent = currentState ? '男女平等' : '';

        // スイッチが操作されたときの処理
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

    // リストを描画する関数
    function renderByodoList() {
        if (!byodoList) return;
        byodoList.innerHTML = ''; // 既存のリストをクリア
        const count = parseInt(localStorage.getItem('byodoCount'), 10);
        for (let i = 1; i < count; i++) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            // 詳細ページへのリンクにURLパラメータを付与
            a.href = `detail.html?item=${i}`;
            a.textContent = `男女平等${i}`;
            li.appendChild(a);
            byodoList.appendChild(li);
        }
    }
    
    // page2.htmlにいる場合のみ実行
    if (byodoList) {
        renderByodoList(); // 初期描画
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
            // SwiftのAlertの代わりにconfirmを使用
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
        // URLパラメータから項目番号を取得
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
        // Cmdキー(Mac)またはCtrlキー(Win)が押されているかチェック
        if (e.metaKey || e.ctrlKey) { 
            let handled = true; // ショートカットが処理されたか
            switch (e.key) {
                case '1':
                    window.location.href = 'index.html';
                    break;
                case '2':
                    window.location.href = 'page2.html';
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
                    handled = false; // どのキーにも該当しない
            }
            if (handled) {
                e.preventDefault(); // ブラウザのデフォルト動作をキャンセル
            }
        }
    });
});
