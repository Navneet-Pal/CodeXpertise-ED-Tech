import ProgressBar from '@ramonak/react-progress-bar'
import {React,useState} from 'react'

export default function EnrolledCourses() {

  const [enrolledCourses , setEnrolledCourses] = useState([]);


  return (
    <div className='text-white'>
    
      
      
      <p>Enrolled Courses</p>

        
      <div>
      {
        !enrolledCourses.length  ? (
          <p>You have not enrolled in any course yet</p>
        ) : (
          <div>
        
            <div>
              <p>Course Name</p>
              <p>Durations</p>
              <p>Progress</p>
            </div>

            <div>
            {
              enrolledCourses.map( (course , index)=> {
                return(
                  <div>

                    <div>
                      <img src={course.thumbnail}/>
                      <div>
                        <p>{course.courseName}</p>
                        <p>{course.description}</p>
                      </div>

                    </div>

                    <p>{course.totalDuration}</p>

                    <div>
                      <ProgressBar maxCompleted={100} completed={50}/>
                    </div>


                  </div>
                )
              })
            }
            </div>
        
        </div>
        )
      }
      </div>
      
      
    
    
    </div>
  )
}
