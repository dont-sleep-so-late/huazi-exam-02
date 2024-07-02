import { Request, Response } from 'express';
import Mock from 'mockjs';
let List = [
  {
    id: 1,
    avatar: 'https://avatars.githubusercontent.com/u/47170023?v=4',
    name: '张三',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '软件工程师',
    skills: 'Python',
    region: ['北京'],
    remark: '备注信息',
  },
  {
    id: 2,
    avatar: 'https://avatars.githubusercontent.com/u/47170023?v=4',
    name: '李四',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '数据分析师',
    skills: 'R',
    region: ['上海'],
    remark: '备注信息',
  },
  {
    id: 3,
    name: '王五',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '产品经理',
    skills: '需求分析',
    region: ['深圳'],
    remark: '备注信息',
  },
  {
    id: 4,
    name: '赵六',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: 'UI设计师',
    skills: 'Photoshop',
    region: ['广州'],
    remark: '备注信息',
  },
  {
    id: 5,
    name: '钱七',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '前端工程师',
    skills: 'HTML, CSS, JavaScript',
    region: ['杭州'],
    remark: '备注信息',
  },
  {
    id: 6,
    name: '孙八',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '后端工程师',
    skills: 'Python, Java',
    region: ['成都'],
    remark: '备注信息',
  },
  {
    id: 7,
    name: '周九',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '测试工程师',
    skills: '自动化测试',
    region: ['重庆'],
    remark: '备注信息',
  },
  {
    id: 8,
    name: '吴十',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '运维工程师',
    skills: 'Linux, Docker',
    region: ['武汉'],
    remark: '备注信息',
  },
  {
    id: 9,
    name: '郑十一',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '网络安全工程师',
    skills: '网络安全知识',
    region: ['南京'],
    remark: '备注信息',
  },
  {
    id: 10,
    name: '王十二',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '大数据工程师',
    skills: 'Hadoop, Spark',
    region: ['苏州'],
    remark: '备注信息',
  },
  {
    id: 11,
    name: '李十三',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '人工智能工程师',
    skills: 'Python, TensorFlow',
    region: ['杭州'],
    remark: '备注信息',
  },
  {
    id: 12,
    name: '张十四',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '区块链工程师',
    skills: '区块链知识',
    region: ['深圳'],
    remark: '备注信息',
  },
  {
    id: 13,
    name: '王十五',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '游戏开发工程师',
    skills: 'Unity, C#',
    region: ['广州'],
    remark: '备注信息',
  },
  {
    id: 14,
    name: '赵十六',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: 'VR/AR开发工程师',
    skills: 'Unity, C#',
    region: ['北京'],
    remark: '备注信息',
  },
  {
    id: 15,
    name: '钱十七',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '游戏测试工程师',
    skills: '游戏测试知识',
    region: ['上海'],
    remark: '备注信息',
  },
  {
    id: 16,
    name: '孙十八',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '游戏运维工程师',
    skills: 'Linux, Docker',
    region: ['深圳'],
    remark: '备注信息',
  },
  {
    id: 17,
    name: '周十九',
    gender: 1,
    birthday: '1990-01-01',
    area: ['北京市', '北京市', '西城区'],
    role: '游戏安全工程师',
    skills: '网络安全知识',
    region: ['北京'],
    remark: '备注信息',
  },
];
const checkRegion = (region: any, userRegion: any) => {
  if (region.length === 0) return false;
  if (userRegion == region) return true;
  return false;
};
export default {
  'GET /home/getData': (req: Request, res: Response) => {
    res.send({
      code: 200,
      msg: 'success',
      data: List,
    });
  },

  'POST /user/getUser': (req: any, res: Response) => {
    const { name, role, region, page = 1, limit = 10 } = req.body;

    const mockList = List.filter((user) => {
      if (name && user.name.indexOf(name) === -1) return false;
      if (role && user.role.indexOf(role) === -1) return false;
      if (region && !region.every((r: any) => user.region.includes(r))) return false;
      return true;
    });
    const pageList = mockList.filter(
      (item, index) => index < limit * page && index >= limit * (page - 1),
    );
    res.send({
      code: 200,
      msg: 'success',
      total: mockList.length,
      data: pageList,
    });
  },

  'POST /user/addUser': (req: any, res: Response) => {
    const { name, role, gender, avatar, skills, region, birthday, area, remark } = req.body;
    List.unshift({
      id: Mock.Random.guid(),
      name,
      role,
      avatar,
      gender,
      skills,
      region,
      birthday,
      area,
      remark,
    });
    res.send({
      code: 200,
      msg: 'success',
      data: {
        message: '添加成功',
      },
    });
  },

  'POST /user/updateUser': (req: any, res: Response) => {
    const { id, name, role, gender, skills, region, birthday, area, remark } = req.body;
    List.some((u) => {
      if (u.id === id) {
        u.name = name;
        u.role = role;
        u.skills = skills;
        u.gender = gender;
        u.region = region;
        u.birthday = birthday;
        u.area = area;
        u.remark = remark;
        return true;
      }
    });
    res.send({
      code: 200,
      msg: 'success',
      data: {
        message: '编辑成功',
      },
    });
  },
  'POST /user/deleteUser': (req: any, res: Response) => {
    const { id } = req.body;
    if (!id) {
      res.send({
        code: 400,
        msg: 'error',
        data: {
          message: '失败',
        },
      });
    } else {
      List = List.filter((u) => u.id !== id);
      res.send({
        code: 200,
        msg: 'success',
        data: {
          message: '删除成功',
        },
      });
    }
  },
};
