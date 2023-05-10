package com.example.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.common.SubmitForm;
import com.example.domain.SubmitData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface SubmitDataMapper extends BaseMapper<SubmitData> {
    @Select("select f.code, f.render_data, f.publish, count(s.id) as submit_count " +
            "from form f " +
            "left join submit_data s on f.code = s.form_code " +
            "where f.user_id = #{userId} " +
            "group by f.code")
    List<SubmitForm> getSubmitFormList(Integer userId);
}
