# git安装使用、常用命令

- 好记性不如烂笔头，我已经吃够了重复安装找命令的苦。自己做个记录

## 参考答案
- [廖雪峰的博客](https://www.liaoxuefeng.com/wiki/896043488029600)
大神的教程，浅显易懂，还有视频！当做参考资料在合适不过了

## 个人作业
那句话怎么说来着，教是最好的学，自己写博客看似在教别人，实则也是在教别人哈哈。写的过程中会发现自己有很多模糊不清的点，写博客可以迫使自己去整理自己的思路、逻辑，加深对知识点的印象。

- ### 安装
git下载，[网址](https://git-scm.com/downloads)
找到合适的系统版本，下载即可，慢的话百度搜索一下git下载慢
下载完成进行傻瓜式安装，安装完在桌面右击会有git Bash选项，进入窗口
- ### 登录注册
首先呢，安装的git，需要告诉git你是谁，约等于其他软件的注册登录步骤，这里用户名和邮箱不指定
    ```
    //命令
    $ git config --global user.name "Your Name"
    $ git config --global user.email "email@example.com"
    ```
- ### 使用
    * #### 初始化
    想要一个目录可以使用git，需要在git Bash中进入相应的目录进行初始化
    ``` 
    //命令
    git init 
    ```
    * #### 添加文件到git仓库（本地)
    ```
    git add <文件名>（git add . 添加目录中的所有文件）
    git commit -m "添加说明内容"
    ```
    * #### 查看
    ```
    git status //查看文件的状态，比如哪些进行的修改
    git diff //查看具体修改的内容，差异
    ```
    * #### 版本回退
    ```
    git log //查看提交历史记录，版本
    git log --pretty=online //历史版本简易信息
    git reset --hard HEAD^//一个^表示回退一个版本
    git reset --hard~100//往上100个版本
    git reflog//记录命令,用此可以找到回退之前的版本（未来版本）
    ```

    * #### 工作区-暂存区-仓库
    git add 就是将文件放入暂存区，git commit把暂存区的文件提交到仓库
    git diff 查看工作区和暂存区的差异
    git diff --cached  查看暂存区与仓库的差异
    git add 的反向命令git checkout将暂存区的内容还原到工作区（约等于撤销对工作区文件的修改）
    git reset HEAD <文件名> 将仓库的内容还原到暂存区（约等于撤销git add）
    * #### 删除文件
    git rm <文件名> //删除工作区和暂存区的内容

- ### 远程仓库
    远程仓库 （git 仓库托管网站）gitHub和码云都是
    * #### 使用
    1.登录注册gitHub（这里以gitHub为例子）
    2.让gitHub和自己的电脑互通有无、暗通曲款。因为总不能所有人都可以上传文件到你的gitHub吧,想要电脑可以上传文件给你的gitHub就要对相应电脑进行暗通曲款。
        （1）他们之间通过ssh加密，创建sshKey
            ``` $ ssh-keygen -t rsa -C "youremail@example.com"  //无需密码 ```
        （2）成功后在用户主目录找到.ssh目录（我用的账户是administrator，所以文件在C:\Users\Administrator\.ssh）
        （3..ssh目录下的id_rsa.pub添加到gitHub（设置-->SSHKey-->new SSHKeys）
    3.本地仓库有远程仓库关联
        远程仓库、本地仓库都可以有很多，要形成对应的关系才能进行上传下载不是吗？
        这里给出两个方法来进行关联
        ``` git remote add origin git@server-name:path/repo-name.git //将本地仓库与远程仓库关联
        git clone git@server-name:path/repo-name.git //将远程仓库下载到本地并与之关联 ```
    4.上传到远程仓库
    ``` git push -u origin master ```//同时分支也进行了关联

- ### 分支管理
    * #### 创建分支 
    ``` git branch <name>```
    * #### 查看分支 
    ``` git branch ```
    * #### 切换分支 
    ``` 
    git checkout <name>
    git switch <name>
    ```
    * #### 创建并切换分支 
    ```
    git checkout -b <name>
    git switch -c <name>
    ```
    * #### 合并某分支到当前分支
    ```git merge <name>```
    * #### 删除分支
    ``` git branch -d <name> ``` 
    * #### 冲突解决
    当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。
    用git log --graph命令可以看到分支合并图。

