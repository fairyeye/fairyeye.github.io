```
<if test="dto.instructionDocStatus != null and dto.instructionDocStatus != ''">
    AND MID.INSTRUCTION_DOC_STATUS IN
    <foreach collection="dto.instructionDocStatus.split(',')" item="item" index="index" separator=",">
        #{item}
    </foreach>
</if>
```