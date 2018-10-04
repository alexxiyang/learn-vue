<template>
   <div id="todolist" class="container" style="margin:20px">
     <div class="input-group mb-3">
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary" type="button" v-on:click="addTask">添加</button>
        </div>
        <input type="text" id="task_content" class="form-control" placeholder="请输入任务内容" aria-label="" aria-describedby="basic-addon1">
     </div>
     <table class="table m-3">
       <thead>
         <th>任务</th>
       </thead>
      <tbody>
        <tr v-for="task in parsedTaskList">
          <td>
            <span v-if="isDone(task)" style="color:gray;text-decoration:line-through;">{{ task }}</span>
            <span v-else >{{ task }}</span>
          </td>
        </tr>
      </tbody>
     </table>
   </div>
</template>

<script>
import Store from './store.js'
import * as moment from 'moment';

const regex = /[0-9]+:[0-9]+/;
/**
 * 该函数作用是解析出字符串中的时间，并将其跟当前时间比较，
 * 计算出还剩多久才会到达计划时间，将剩余时间拼接在字符串后。
 * 如果当前时间已经过了计划时间，则不对字符串做任何改变
 * 例子：
 * 23:40 回家 -> 23:40 回家 (还有 6 小时 36 分 15 秒)
 */
const addRemainTime = (task) => {
  let result = task.match(regex);
  if (result != null && result.length > 0) {
    let taskTime = result[0];
    let thisMoment = moment();
    let currentDate = thisMoment.format('YYYY-MM-DD');
    let taskMoment = moment(currentDate + " " + taskTime, 'YYYY-MM-DD HH:mm');
    if (taskMoment.valueOf() < thisMoment.valueOf()) {
      return task;
    }
    let duration = moment.duration(taskMoment.diff(thisMoment));
    let durationText = duration.hours() + " 小时 " + duration.minutes() + " 分 " + duration.seconds() + " 秒";
    return task + " (还有 " + durationText + ")";
  }
  return task;
}

export default {
  name: 'TodoList',
  data: function() {
    return {
      taskList: Store.fetch()
    }
  },
  watch: {
    taskList: {
      handler: function(tasks) {
        Store.save(tasks)
      }
    }
  },
  computed: {
    parsedTaskList: function () {
      let parsedTaskList = [];
      for (let i=0; i<this.taskList.length; i++) {
        parsedTaskList.push(addRemainTime(this.taskList[i]));
      }
      return parsedTaskList;
    }
  },
  methods: {
    addTask: function(event) {
      // 获取任务内容
      let task_content = document.querySelector("#task_content");
      // 添加任务内容到任务列表中
      this.taskList.push(task_content.value);
      // 清空任务内容输入框
      task_content.value = '';
    },
    isDone (task) {
      let result = task.match(/还有\s[0-9]+\s小时\s[0-9]+\s分\s[0-9]+\s秒/);
      return result == null || result.length == 0;
    }
  }
}
</script>